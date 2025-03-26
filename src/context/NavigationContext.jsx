import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const goToHomePage = () => {
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
    setCurrentPage("home");
  };

  const goToLibraryPage = () => {
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
    setCurrentPage("library");
  };

  const goToSettingsPage = () => {
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
    setCurrentPage("settings");
  };

  const goToAlbumPage = (album) => {
    setSelectedAlbum(album);
    setSelectedPlaylist(null);
    setCurrentPage("album");
  };

  const goToPlaylistPage = (playlist) => {
    setSelectedPlaylist(playlist);
    setSelectedAlbum(null);
    setCurrentPage("playlist");
  };

  const value = {
    currentPage,
    selectedAlbum,
    selectedPlaylist,
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
