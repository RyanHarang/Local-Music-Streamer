import { useNavigation } from "./context/NavigationContext.jsx";
import Layout from "./layouts/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";
import PlaylistPage from "./pages/PlaylistPage.jsx";
import LikedSongsPage from "./pages/LikedSongsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

const App = () => {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "library":
        return <LibraryPage />;
      case "album":
        return <AlbumPage />;
      case "playlist":
        return <PlaylistPage />;
      case "liked-songs":
        return <LikedSongsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

export default App;
