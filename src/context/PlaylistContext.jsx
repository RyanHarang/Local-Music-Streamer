import { createContext, useContext, useEffect, useState } from "react";

/**
 * Context for playlist functionality across application
 * @type {React.Context}
 */
const PlaylistContext = createContext();

/**
 * Custom hook to access PlaylistContext
 * @returns {Object} Playlist context values and methods
 */
export const usePlaylists = () => useContext(PlaylistContext);

/**
 * Provider component that wraps  application to make playlist state available
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render within provider
 * @returns {JSX.Element} Provider component with playlist context
 */
export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);

  /**
   * Fetches playlists from the server on load
   */
  useEffect(() => {
    fetchPlaylists();
  }, []);

  /**
   * Fetches playlists from the server
   */
  const fetchPlaylists = async () => {
    try {
      const response = await fetch("http://localhost:3000/playlists");
      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }
      const data = await response.json();
      setPlaylists(data.playlists || []);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Creates a new playlist
   * @param {string} name - Name of new playlist
   */
  const createPlaylist = async (name) => {
    try {
      const response = await fetch("http://localhost:3000/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      const newPlaylist = await response.json();
      setPlaylists([...playlists, newPlaylist]);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Deletes a playlist
   * @param {string} id - ID of playlist to delete
   */
  const deletePlaylist = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/playlists/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete playlist");
      }

      setPlaylists(playlists.filter((playlist) => playlist.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Renames a playlist
   * @param {string} id - ID of playlist to rename
   * @param {string} newName - New name for playlist
   */
  const renamePlaylist = async (id, newName) => {
    try {
      const response = await fetch(`http://localhost:3000/playlists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) {
        throw new Error("Failed to rename playlist");
      }

      const updatedPlaylist = await response.json();
      setPlaylists(
        playlists.map((playlist) =>
          playlist.id === id ? { ...playlist, ...updatedPlaylist } : playlist,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Adds a track to a playlist
   * @param {string} playlistId - ID of playlist to add track to
   * @param {string} trackId - ID of track to add to playlist
   */
  const addTrackToPlaylist = async (playlistId, trackId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/playlists/${playlistId}/tracks/${trackId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update playlist tracks");
      }

      const { playlist: updatedPlaylist } = await response.json();

      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, ...updatedPlaylist }
            : playlist,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Removes a track from a playlist
   * @param {string} playlistId - ID of playlist to remove track from
   * @param {string} trackId - ID of track to remove from playlist
   */
  const removeTrackFromPlaylist = async (playlistId, trackId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/playlists/${playlistId}/tracks/${trackId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove track from playlist");
      }

      const { playlist: updatedPlaylist } = await response.json();

      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, ...updatedPlaylist }
            : playlist,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Context value object containing all externally accessible playlist state and methods
   * @type {Object}
   */
  const value = {
    playlists,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};
