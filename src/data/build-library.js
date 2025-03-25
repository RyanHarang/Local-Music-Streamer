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

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const buildLibrary = async () => {
  const library = { albums: {}, tracks: {} };
  const albumCovers = {};
  const albumDates = {};

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
      const webPath = `/music/${relativePath}`;
      const releaseDate = formatDate(common.date) || null;
      const trackDuration = metadata.format.duration || 0;

      // Generate Album ID
      const albumId = crypto
        .createHash("sha1")
        .update(`${albumArtist}-${album}`)
        .digest("hex");

      // Cover Art
      const picture = common.picture && common.picture[0];
      if (!albumCovers[albumId] && picture) {
        albumCovers[albumId] = saveCoverImage(picture);
      }
      const coverPath = albumCovers[albumId] || null;

      // Store first track's release date for the album
      if (!albumDates[albumId] && releaseDate) {
        albumDates[albumId] = releaseDate;
      }

      // Generate Track ID
      const trackId = crypto
        .createHash("sha1")
        .update(`${albumArtist}-${album}-${title}`)
        .digest("hex");

      // Track Info
      library.tracks[trackId] = {
        id: trackId,
        title,
        trackNumber,
        albumId,
        artists,
        year,
        genres,
        path: webPath,
        duration: trackDuration,
      };

      // Album Info
      if (!library.albums[albumId]) {
        library.albums[albumId] = {
          id: albumId,
          title: album,
          albumArtist,
          albumReleaseDate: albumDates[albumId] || null,
          cover: coverPath,
          tracks: [],
          trackCount: 0,
          albumDuration: 0,
        };
      }

      library.albums[albumId].tracks.push(trackId);
      library.albums[albumId].trackCount += 1;
      library.albums[albumId].albumDuration += trackDuration;

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
