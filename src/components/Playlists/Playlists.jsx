import { useState } from "react";
import { usePlaylists } from "../../context/PlaylistContext.jsx";
import TrashButton from "../Controls/Buttons/TrashButton.jsx";
import NewPlaylistModal from "../Modals/NewPlaylistModal.jsx";

const Playlists = ({ onPlaylistClick }) => {
  const { playlists, deletePlaylist } = usePlaylists();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deletePlaylist(id);
  };

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

      {!playlists || playlists.length === 0 ? (
        <p>No playlists yet. Create one!</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => onPlaylistClick(playlist)}
              className="via-accent/40 to-accent flex cursor-pointer justify-between rounded bg-gradient-to-br from-black p-4 shadow hover:underline"
            >
              <h3 className="mt-2 text-lg font-semibold">{playlist.name}</h3>
              <TrashButton handleClick={(e) => handleDelete(e, playlist.id)} />
            </div>
          ))}
        </div>
      )}
      {showModal && <NewPlaylistModal closeModal={() => setShowModal(false)} />}
    </section>
  );
};

export default Playlists;
