import express from "express";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import * as mm from "music-metadata";
import multer from "multer";
import cors from "cors";
import { exec } from "child_process";
import { fileURLToPath } from "url";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLAYLISTS_FILE = path.join(__dirname, "./src/data/playlists.json");
const LIKED_SONGS_FILE = path.join(__dirname, "./src/data/likedSongs.json");
const LIBRARY_BUILD_SCRIPT = path.join(
  __dirname,
  "./src/data/build-library.js",
);
const UPLOAD_PATH = path.join(__dirname, "./public/music");

const getPlaylists = async () => {
  try {
    await ensurePlaylistFileExists();

    const data = await fsPromises.readFile(PLAYLISTS_FILE, "utf8");
    const parsedData = JSON.parse(data);

    return parsedData.playlists ? parsedData : { playlists: [] };
  } catch (error) {
    console.error("Error reading playlists:", error);
    return { playlists: [] };
  }
};

const ensurePlaylistFileExists = async () => {
  try {
    await fsPromises.access(PLAYLISTS_FILE);
  } catch {
    await fsPromises.writeFile(
      PLAYLISTS_FILE,
      JSON.stringify({ playlists: [] }, null, 2),
    );
  }
};

const savePlaylists = async (playlists) => {
  try {
    const playlistsData = { playlists };
    await fsPromises.writeFile(
      PLAYLISTS_FILE,
      JSON.stringify(playlistsData, null, 2),
    );
  } catch (error) {
    console.error("Error saving playlists:", error);
    throw error;
  }
};

const ensureLikedSongsFileExists = async () => {
  try {
    await fsPromises.access(LIKED_SONGS_FILE);
  } catch {
    const initialData = {
      id: "liked-songs",
      name: "Liked Songs",
      tracks: [],
      trackCount: 0,
    };

    await fsPromises.writeFile(
      LIKED_SONGS_FILE,
      JSON.stringify(initialData, null, 2),
    );
  }
};

const getLikedSongs = async () => {
  try {
    await ensureLikedSongsFileExists();
    const data = await fsPromises.readFile(LIKED_SONGS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading liked songs:", error);
    return { likedSongs: {} };
  }
};

const saveLikedSongs = async (likedSongs) => {
  try {
    await fsPromises.writeFile(
      LIKED_SONGS_FILE,
      JSON.stringify(likedSongs, null, 2),
    );
  } catch (error) {
    console.error("Error saving liked songs:", error);
    throw error;
  }
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const filePath = path.join(UPLOAD_PATH, "temp");
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/flac",
      "audio/x-flac",
      "audio/m4a",
      "audio/aac",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
      console.log("Saving ", file.originalname);
    } else {
      cb(new Error("Invalid file type. Only audio files are allowed."), false);
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
});

// Get all playlists
app.get("/playlists", async (req, res) => {
  try {
    const playlistsData = await getPlaylists();
    res.json(playlistsData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlists" });
  }
});

// Create a new playlist
app.post("/playlists", async (req, res) => {
  try {
    const playlistsData = await getPlaylists();
    const newPlaylist = {
      id: Date.now().toString(),
      name: req.body.name,
      tracks: [],
      trackCount: 0,
    };

    playlistsData.playlists.push(newPlaylist);
    await savePlaylists(playlistsData.playlists);

    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Error creating playlist" });
  }
});

// Delete a playlist
app.delete("/playlists/:id", async (req, res) => {
  try {
    const playlistsData = await getPlaylists();

    const initialLength = playlistsData.playlists.length;
    playlistsData.playlists = playlistsData.playlists.filter(
      (p) => p.id !== req.params.id,
    );

    if (playlistsData.playlists.length === initialLength) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    await savePlaylists(playlistsData.playlists);

    res.json({ message: "Playlist deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting playlist" });
  }
});

// Rename a playlist
app.put("/playlists/:id", async (req, res) => {
  try {
    const playlistsData = await getPlaylists();
    const playlist = playlistsData.playlists.find(
      (p) => p.id === req.params.id,
    );

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.name = req.body.name;
    await savePlaylists(playlistsData.playlists);

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error renaming playlist" });
  }
});

// Add track to playlist
app.put("/playlists/:playlistId/tracks/:trackId", async (req, res) => {
  try {
    const { playlistId, trackId } = req.params;
    const playlistsData = await getPlaylists();
    const playlist = playlistsData.playlists.find((p) => p.id === playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const trackExists = playlist.tracks.some((track) => track.id === trackId);
    if (trackExists) {
      return res
        .status(400)
        .json({ message: "Track already exists in the playlist" });
    }

    // Determine the next order value
    const nextOrder =
      playlist.tracks.length > 0
        ? Math.max(...playlist.tracks.map((t) => t.order)) + 1
        : 1;

    const newTrack = {
      id: trackId,
      order: nextOrder,
    };

    playlist.tracks.push(newTrack);
    playlist.trackCount = playlist.tracks.length;

    await savePlaylists(playlistsData.playlists);

    return res.status(200).json({
      message: "Track added successfully",
      playlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding track to playlist" });
  }
});

// Remove track from playlist
app.delete("/playlists/:playlistId/tracks/:trackId", async (req, res) => {
  try {
    const { playlistId, trackId } = req.params;
    const playlistsData = await getPlaylists();
    const playlist = playlistsData.playlists.find((p) => p.id === playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Find the index of the track to be deleted
    const trackIndex = playlist.tracks.findIndex(
      (track) => track.id === trackId,
    );
    if (trackIndex === -1) {
      return res
        .status(404)
        .json({ message: "Track not found in the playlist" });
    }

    // Remove the track from the playlist
    playlist.tracks.splice(trackIndex, 1);
    playlist.trackCount = playlist.tracks.length;

    await savePlaylists(playlistsData.playlists);

    return res.status(200).json({
      message: "Track removed successfully",
      playlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing track from playlist" });
  }
});

app.get("/liked-songs", async (req, res) => {
  try {
    const likedSongsData = await getLikedSongs();
    res.json(likedSongsData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching liked songs" });
  }
});

app.post("/liked-songs/:trackId", async (req, res) => {
  try {
    const { trackId } = req.params;
    const likedSongs = await getLikedSongs();
    const trackIndex = likedSongs.tracks.findIndex(
      (track) => track.id === trackId,
    );
    if (trackIndex !== -1) {
      likedSongs.tracks.splice(trackIndex, 1);
    } else {
      likedSongs.tracks.push({ id: trackId });
    }

    likedSongs.trackCount = likedSongs.tracks.length;
    await saveLikedSongs(likedSongs);
    res.json(likedSongs);
  } catch (error) {
    res.status(500).json({ message: "Error updating liked songs" });
  }
});

app.post("/build-library", (req, res) => {
  exec(`node ${LIBRARY_BUILD_SCRIPT}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return res.status(500).json({
        message: "Failed to build library",
        error: error.message,
      });
    }

    if (stderr) {
      console.error(`Script stderr: ${stderr}`);
      return res.status(500).json({
        message: "Library build encountered errors",
        error: stderr,
      });
    }

    console.log(`Library build output: ${stdout}`);
    res.status(200).json({
      message: "Library built successfully!",
      output: stdout,
    });
  });
});

app.post("/upload-music", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const tempFilePath = req.file.path;
    const metadata = await mm.parseFile(tempFilePath).catch(() => ({}));
    const artist = metadata.common.artist || "Unknown Artist";
    const album = metadata.common.album || "Unknown Album";
    const albumFolderName = `${artist} - ${album}`;
    const artistDir = path.join(UPLOAD_PATH, artist);
    const albumDir = path.join(artistDir, albumFolderName);

    if (!fs.existsSync(artistDir)) {
      fs.mkdirSync(artistDir, { recursive: true });
    }
    if (!fs.existsSync(albumDir)) {
      fs.mkdirSync(albumDir, { recursive: true });
    }

    const title =
      metadata.common.title ||
      path.basename(req.file.originalname, path.extname(req.file.originalname));

    let trackNumber;
    if (metadata.common.track && metadata.common.track.no) {
      trackNumber = String(metadata.common.track.no).padStart(2, "0");
    } else {
      trackNumber = "XX";
    }

    const fileName = `${trackNumber} - ${title}${path.extname(req.file.originalname)}`;
    let finalFilePath = path.join(albumDir, fileName);
    let counter = 1;

    while (fs.existsSync(finalFilePath)) {
      const newFileName = `${trackNumber} - ${title} (${counter})${path.extname(req.file.originalname)}`;
      finalFilePath = path.join(albumDir, newFileName);
      counter++;
    }

    fs.renameSync(tempFilePath, finalFilePath);

    res.json({
      success: true,
      message: "File uploaded successfully",
      file: {
        originalName: req.file.originalname,
        artist,
        album: albumFolderName,
        trackNumber,
        title,
        finalPath: finalFilePath,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
