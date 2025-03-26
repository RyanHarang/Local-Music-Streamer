import { usePlayer } from "../../context/PlayerContext.jsx";
import Track from "../Track/Track.jsx";
import QueueButton from "../Controls/Buttons/QueueButton.jsx";

const Songlist = ({ tracks }) => {
  const { startSonglist, addToQueue } = usePlayer();

  const handlePlay = () => {
    if (tracks && tracks.length > 0) startSonglist(tracks, 0);
  };

  const handleAddToQueue = () => {
    if (tracks && tracks.length > 0) {
      addToQueue(tracks);
    }
  };

  return (
    <>
      <div className="mb-2 flex items-center gap-4">
        <button
          onClick={handlePlay}
          className="bg-accent hover:bg-accent/80 rounded px-4 py-2"
        >
          Play
        </button>
        <QueueButton handleClick={handleAddToQueue} />
      </div>
      <div className="border-dark-fg2 flex w-full flex-col overflow-hidden rounded-md border">
        {!tracks || tracks.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No songs available
          </div>
        ) : (
          tracks.map((track, index) => (
            <Track
              key={track.albumArtist + track.title}
              track={track}
              index={index}
              inSonglist={true}
              songlist={tracks}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Songlist;
