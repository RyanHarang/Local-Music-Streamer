import { usePlaylists } from "../context/PlaylistContext.jsx";
import { usePlayer } from "../context/PlayerContext.jsx";
import LikedSongs from "../components/LikedSongs/LikedSongs.jsx";
import Playlists from "../components/Playlists/Playlists.jsx";
import Loading from "../components/Loading/Loading.jsx";

const HomePage = () => {
  const { playlists, likedSongs } = usePlaylists();
  const { library } = usePlayer();

  if (!playlists || !likedSongs || !library || !library.tracks) {
    return <Loading />;
  }

  return (
    <>
      <LikedSongs />
      <Playlists />
    </>
  );
};

export default HomePage;
