import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";
import ButtonControls from "../Controls/ButtonControls.jsx";
import ProgressBar from "../Controls/ProgressBar.jsx";

const NowPlayingModal = ({ closeModal }) => {
  const { currentTrack, currentCover } = usePlayer();
  const dialogRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    const contentElement = contentRef.current;
    if (dialogElement) {
      dialogElement.showModal();
    }

    const handleClickOutside = (event) => {
      if (contentElement && !contentElement.contains(event.target)) {
        closeModal();
      }
    };

    window.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [closeModal]);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="text-dark-fg m-auto overflow-hidden rounded bg-transparent backdrop:bg-black"
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center gap-2"
      >
        <img
          src={currentCover}
          alt={`Cover of ${currentTrack.title}`}
          className="h-128 w-128 rounded object-cover"
        />
        <div className="flex flex-col items-center justify-center">
          <span className="text-xl font-semibold">
            {currentTrack?.title || "No track playing"}
          </span>
          <div className="text-md">
            {currentTrack &&
              Array.isArray(currentTrack.artists) &&
              currentTrack.artists.map((artist, index) => (
                <span key={`${artist}-${index}`} className="text-dark-fg2 mr-1">
                  {artist}
                  {index < currentTrack.artists.length - 1 && ", "}
                </span>
              ))}
          </div>
        </div>
        <ButtonControls />
        <ProgressBar />
      </div>
    </dialog>
  );
};

export default NowPlayingModal;
