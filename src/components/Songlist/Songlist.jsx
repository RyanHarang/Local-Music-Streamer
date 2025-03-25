import { usePlayer } from "../../context/PlayerContext.jsx";
import Track from "../Track/Track.jsx";

const Songlist = ({ tracks }) => {
  const { startSonglist } = usePlayer();
  const handlePlay = () => {
    startSonglist(tracks, 0);
  };
  return (
    <>
      <button
        onClick={handlePlay}
        className="bg-accent hover:bg-accent/80 mb-2 rounded px-4 py-2"
      >
        Play
      </button>
      <div className="border-light-fg2 dark:border-dark-fg2 flex w-full flex-col overflow-hidden rounded-md border">
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
