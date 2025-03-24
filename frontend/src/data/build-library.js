import fs from "fs";
import path from "path";
import crypto from "crypto";
import * as mm from "music-metadata";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MUSIC_DIR = path.join(__dirname, "../../public/music");
const COVER_DIR = path.join(__dirname, "../../public/covers");
const OUTPUT_FILE = path.join(__dirname, "./library.json");

if (!fs.existsSync(COVER_DIR)) {
  fs.mkdirSync(COVER_DIR);
}

const walkDir = (dir, fileCallback) => {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walkDir(filepath, fileCallback);
    } else if (stat.isFile()) {
      fileCallback(filepath);
    }
  });
};

const saveCoverImage = (picture) => {
  if (!picture) return null;

  const hash = crypto.createHash("sha1").update(picture.data).digest("hex");
  const ext = picture.format === "image/png" ? "png" : "jpg";
  const filename = `${hash}.${ext}`;
  const filepath = path.join(COVER_DIR, filename);

  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, picture.data);
    console.log(`Saved cover: ${filename}`);
  }

  return `covers/${filename}`;
};

const buildLibrary = async () => {
  const library = {}; // artist -> album -> tracks
  const albumCovers = {}; // albumArtist + album => coverPath (deduplicates)

  const processFile = async (filepath) => {
    try {
      const metadata = await mm.parseFile(filepath);
      const common = metadata.common;
      const title = common.title || path.basename(filepath);
      const trackNumber = common.track.no || null;
      const album = common.album || "Unknown Album";
      const albumArtist = common.albumartist || "Unknown Artist";
      const artists = common.artists || (common.artist ? [common.artist] : []);
      const year = common.year || null;
      const genres = common.genre || [];
      const relativePath = path.relative(MUSIC_DIR, filepath);

      // Cover Art
      const picture = common.picture && common.picture[0];
      let coverPath = null;

      // Check for album-level cover
      const albumKey = `${albumArtist}-${album}`;
      if (!albumCovers[albumKey] && picture) {
        albumCovers[albumKey] = saveCoverImage(picture);
      }

      // If album cover exists, reuse it
      coverPath = albumCovers[albumKey] || null;
      const albumReleaseDate = year;

      const trackInfo = {
        title,
        trackNumber,
        album,
        albumArtist,
        artists,
        year,
        genres,
        path: relativePath,
        cover: coverPath,
      };

      if (!library[albumArtist]) {
        library[albumArtist] = {};
      }

      if (!library[albumArtist][album]) {
        library[albumArtist][album] = {
          albumReleaseDate,
          cover: coverPath,
          tracks: [],
        };
      }

      library[albumArtist][album].tracks.push(trackInfo);

      console.log(`Processed: ${title}`);
    } catch (error) {
      console.error(`Error processing ${filepath}:`, error.message);
    }
  };

  const filePromises = [];
  walkDir(MUSIC_DIR, (filepath) => {
    filePromises.push(processFile(filepath));
  });

  await Promise.all(filePromises);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(library, null, 2));
  console.log("Library build complete!");
};

buildLibrary();
