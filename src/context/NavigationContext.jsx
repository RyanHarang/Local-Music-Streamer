import React, { createContext, useContext, useState } from "react";

/**
 * Context for navigation functionality across application
 * @type {React.Context}
 */
const NavigationContext = createContext();

/**
 * Custom hook to access NavigationContext
 * @returns {Object} Navigation context values and methods
 */
export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [previousPage, setPreviousPage] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [initialQuery, setInitialQuery] = useState("");

  /**
   * Navigates to previous page
   */
  const goToPreviousPage = () => {
    if (previousPage) {
      setCurrentPage(previousPage);
      setPreviousPage(null);
    }
  };

  /**
   * Navigates to home page
   */
  const goToHomePage = () => {
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
    setPreviousPage(currentPage);
    setCurrentPage("home");
  };

  /**
   * Navigates to library page
   * * @param {Object} initialQuery - Query to filter library
   */
  const goToLibraryPage = (initialQuery = "") => {
    setInitialQuery(initialQuery);
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
    setPreviousPage(currentPage);
    setCurrentPage("library");
  };

  /**
   * Navigates to settings page
   */
  const goToSettingsPage = () => {
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
    setPreviousPage(currentPage);
    setCurrentPage("settings");
  };

  /**
   * Navigates to album page
   * @param {Object} album - Album object
   */
  const goToAlbumPage = (album) => {
    setSelectedAlbum(album);
    setPreviousPage(currentPage);
    setCurrentPage("album");
  };

  /**
   * Navigates to playlist page
   * @param {Object} playlist - Playlist object
   */
  const goToPlaylistPage = (playlist) => {
    setSelectedPlaylist(playlist);
    setPreviousPage(currentPage);
    setCurrentPage("playlist");
  };

  /**
   * Context value object containing all externally accessible navigation state and methods
   * @type {Object}
   */
  const value = {
    currentPage,
    previousPage,
    selectedAlbum,
    selectedPlaylist,
    initialQuery,
    goToPreviousPage,
    goToHomePage,
    goToLibraryPage,
    goToSettingsPage,
    goToAlbumPage,
    goToPlaylistPage,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
