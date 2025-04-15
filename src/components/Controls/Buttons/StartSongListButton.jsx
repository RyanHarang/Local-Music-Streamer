import { usePlayer } from "../../context/PlayerContext.jsx";

const StartSonglistButton = ({ songlist }) => {
  const { isShuffle, startSonglist } = usePlayer();
  const handlePlay = (event) => {
    event.stopPropagation();
    if (songlist && songlist.length > 0) {
      let index =
        isShuffle && songlist.length > 1
          ? Math.floor(Math.random() * songlist.length)
          : 0;
      startSonglist(songlist, index);
    }
  };

  return (
    <button
      onClick={(event) => handlePlay(event)}
      className="bg-accent hover:bg-accent/80 cursor-pointer rounded px-4 py-2 @xl:my-2"
    >
      Play
    </button>
  );
};

export default StartSonglistButton;
