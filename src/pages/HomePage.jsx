import Playlists from "../components/Playlists/Playlists.jsx";

const HomePage = ({ onPlaylistClick }) => {
  return <Playlists onPlaylistClick={onPlaylistClick} />;
};

export default HomePage;
