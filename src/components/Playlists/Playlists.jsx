import { useState } from "react";
import { usePlaylists } from "../../context/PlaylistContext.jsx";
import NewPlaylistModal from "./NewPlaylistModal.jsx";

const Playlists = ({ onPlaylistClick }) => {
  const [showModal, setShowModal] = useState(false);
  const { playlists } = usePlaylists();

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
              className="via-accent/40 to-accent cursor-pointer rounded bg-gradient-to-br from-black p-4 shadow transition-all duration-300 ease-in-out hover:underline"
            >
              <h3 className="mt-2 text-lg font-semibold">{playlist.name}</h3>
            </div>
          ))}
        </div>
      )}
      {showModal && <NewPlaylistModal closeModal={() => setShowModal(false)} />}
    </section>
  );
};

export default Playlists;
