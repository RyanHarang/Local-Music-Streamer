import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [previousPage, setPreviousPage] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const goToPreviousPage = () => {
    if (previousPage) {
      setCurrentPage(previousPage);
      setPreviousPage(null);
    }
  };

  const goToHomePage = () => {
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
    setPreviousPage(currentPage);
    setCurrentPage("home");
  };

  const goToLibraryPage = () => {
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
    setPreviousPage(currentPage);
    setCurrentPage("library");
  };

  const goToSettingsPage = () => {
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
    setPreviousPage(currentPage);
    setCurrentPage("settings");
  };

  const goToAlbumPage = (album) => {
    setSelectedAlbum(album);
    // setSelectedPlaylist(null);
    setPreviousPage(currentPage);
    setCurrentPage("album");
  };

  const goToPlaylistPage = (playlist) => {
    setSelectedPlaylist(playlist);
    // setSelectedAlbum(null);
    setPreviousPage(currentPage);
    setCurrentPage("playlist");
  };

  const value = {
    currentPage,
    previousPage,
    selectedAlbum,
    selectedPlaylist,
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
