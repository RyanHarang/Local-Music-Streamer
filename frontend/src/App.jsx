import { useState } from "react";
import Layout from "./layouts/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";
import PlaylistPage from "./pages/PlaylistPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

const App = () => {
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

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPlaylistClick={goToPlaylistPage} />;
      case "library":
        return <LibraryPage onAlbumClick={goToAlbumPage} />;
      case "album":
        return <AlbumPage album={selectedAlbum} goBack={goToLibraryPage} />;
      case "playlist":
        return (
          <PlaylistPage playlist={selectedPlaylist} goBack={goToHomePage} />
        );
      case "settings":
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout onNavChange={setCurrentPage} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
