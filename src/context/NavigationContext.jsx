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
  const [scrollPositions, setScrollPositions] = useState({});

  /**
   * Navigates to previous page
   */
  const goToPreviousPage = () => {
    if (previousPage && previousPage !== currentPage) {
      switch (previousPage) {
        case "home":
          goToHomePage();
          break;
        case "library":
          goToLibraryPage();
          break;
        case "settings":
          goToSettingsPage();
          break;
        default:
          setCurrentPage(previousPage);
      }
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
   * * @param {String} initialQuery - Query to filter library
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
   * Navigates to liked songs page
   * @param {Object} playlist - Playlist object
   */
  const goToLikedSongPage = (playlist) => {
    setSelectedPlaylist(playlist);
    setPreviousPage(currentPage);
    setCurrentPage("liked-songs");
  };

  /**
   * Saves scroll position for a specific page
   * @param {string} page - Page identifier
   * @param {number} position - Scroll position to save
   */
  const saveScrollPosition = (page, position) => {
    setScrollPositions((prev) => ({
      ...prev,
      [page]: position,
    }));
  };

  /**
   * Gets saved scroll position for a specific page
   * @param {string} page - Page identifier
   * @returns {number} Saved scroll position or 0
   */
  const getScrollPosition = (page) => {
    return scrollPositions[page] || 0;
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
    setInitialQuery,
    goToPreviousPage,
    goToHomePage,
    goToLibraryPage,
    goToSettingsPage,
    goToAlbumPage,
    goToPlaylistPage,
    goToLikedSongPage,
    saveScrollPosition,
    getScrollPosition,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
