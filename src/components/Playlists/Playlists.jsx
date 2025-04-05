import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlaylists } from "../../context/PlaylistContext.jsx";
import TrashButton from "../Controls/Buttons/TrashButton.jsx";
import NewPlaylistModal from "../Modals/NewPlaylistModal.jsx";
import Loading from "../Loading/Loading.jsx";

const Playlists = () => {
  const { goToPlaylistPage } = useNavigation();
  const { playlists, deletePlaylist } = usePlaylists();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deletePlaylist(id);
  };

  if (!playlists) {
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
        <div className="grid grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => goToPlaylistPage(playlist)}
              className="via-accent/40 to-accent hover:bg-accent flex h-16 cursor-pointer items-center justify-center rounded bg-gradient-to-br from-black px-3 py-1 shadow transition-all duration-200"
            >
              <div className="flex w-full justify-between">
                <div>
                  <h3 className="mt-2 text-lg font-semibold group-hover:underline">
                    {playlist.name}
                  </h3>
                  <span className="text-dark-fg2 text-sm">
                    {playlist.trackCount} tracks
                  </span>
                </div>
                <TrashButton
                  handleClick={(e) => handleDelete(e, playlist.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && <NewPlaylistModal closeModal={() => setShowModal(false)} />}
    </section>
  );
};

export default Playlists;
