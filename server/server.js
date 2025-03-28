const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");
const { exec } = require("child_process");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const PLAYLISTS_FILE = path.join(__dirname, "../src/data/playlists.json");
const LIBRARY_BUILD_SCRIPT = path.join(
  __dirname,
  "../src/data/build-library.js",
);

const getPlaylists = async () => {
  try {
    await ensurePlaylistFileExists();

    const data = await fs.readFile(PLAYLISTS_FILE, "utf8");
    const parsedData = JSON.parse(data);

    return parsedData.playlists ? parsedData : { playlists: [] };
  } catch (error) {
    console.error("Error reading playlists:", error);
    return { playlists: [] };
  }
};

const ensurePlaylistFileExists = async () => {
  try {
    await fs.access(PLAYLISTS_FILE);
  } catch {
    await fs.writeFile(
      PLAYLISTS_FILE,
      JSON.stringify({ playlists: [] }, null, 2),
    );
  }
};

const savePlaylists = async (playlists) => {
  try {
    const playlistsData = { playlists };
    await fs.writeFile(PLAYLISTS_FILE, JSON.stringify(playlistsData, null, 2));
  } catch (error) {
    console.error("Error saving playlists:", error);
    throw error;
  }
};

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

    // Check if track already exists
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

    // Add the new track
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
