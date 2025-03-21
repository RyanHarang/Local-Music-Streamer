import Playlists from "../components/Playlists/Playlists.jsx";

const HomePage = ({ onAlbumClick, onPlaylistClick }) => {
  return <Playlists onPlaylistClick={onPlaylistClick} />;
};

export default HomePage;
