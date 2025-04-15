import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlaylists } from "../../context/PlaylistContext.jsx";
import { usePlayer } from "../../context/PlayerContext.jsx";
import Playlist from "./Playlist.jsx";
import NewPlaylistModal from "../Modals/NewPlaylistModal.jsx";
import Loading from "../Loading/Loading.jsx";

const Playlists = () => {
  const { goToPlaylistPage } = useNavigation();
  const { playlists } = usePlaylists();
  const { library } = usePlayer();
  const [showModal, setShowModal] = useState(false);

  if (!playlists || !library || !library.tracks) {
    return <Loading />;
  }

  return (
    <section className="space-y-8 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Playlists</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-accent hover:bg-accent/80 rounded px-4 py-2"
        >
          + New Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <p>No playlists yet. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {playlists.map((playlist) => (
            <Playlist
              key={playlist.id}
              playlist={playlist}
              onPlaylistClick={() => goToPlaylistPage(playlist)}
              onPlaylistPage={false}
            />
          ))}
        </div>
      )}
      {showModal && <NewPlaylistModal closeModal={() => setShowModal(false)} />}
    </section>
  );
};

export default Playlists;
