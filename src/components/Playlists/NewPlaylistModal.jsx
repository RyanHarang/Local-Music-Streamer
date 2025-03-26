import { useState, useEffect, useRef } from "react";
import { usePlaylists } from "../../context/PlaylistContext.jsx";

const NewPlaylistModal = ({ closeModal }) => {
  const [playlistName, setPlaylistName] = useState("");
  const { createPlaylist } = usePlaylists();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (playlistName.trim()) {
      createPlaylist(playlistName.trim());
      closeModal();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.showModal();
      inputRef.current?.focus();
    }
  }, [closeModal]);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="dark:bg-dark-bg text-light-fg dark:text-dark-fg fixed z-50 m-auto w-11/12 max-w-md overflow-hidden rounded bg-white p-0 shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h3 className="mb-4 text-center text-2xl font-semibold">
          Create Playlist
        </h3>
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter playlist name"
            className="focus:ring-accent w-full rounded border px-3 py-2 focus:ring-4 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex justify-between border-t pt-4">
          <button
            onClick={handleSubmit}
            disabled={!playlistName.trim()}
            className="bg-accent hover:bg-accent/80 rounded-md px-6 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="rounded-md px-6 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default NewPlaylistModal;
