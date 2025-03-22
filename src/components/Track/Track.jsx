import { usePlayer } from "../../context/PlayerContext.jsx";
import PlayButton from "../Controls/Buttons/PlayButton.jsx";
import QueueButton from "../Controls/Buttons/QueueButton.jsx";

const Track = ({ track, index, inSonglist = false, songlist = [] }) => {
  const { isPlaying, currentTrack, play, pause, startSonglist } = usePlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

  const handlePlay = () => {
    if (isCurrentTrack) {
      if (isPlaying) pause();
      else play(track);
    } else {
      if (inSonglist) {
        startSonglist(songlist, index);
      } else play(track);
    }
  };

  return (
    <div className="dark:hover:bg-dark-bg3 hover:bg-light-bg2 flex cursor-pointer items-center justify-between rounded px-4 py-2">
      <div className="flex items-center gap-4">
        <span className="w-6 text-center text-sm">{index + 1}</span>
        <PlayButton
          track={track}
          isCurrentTrack={isCurrentTrack}
          isPlaying={isPlaying}
          handleClick={handlePlay}
        />
        <div className="flex flex-col">
          <span
            className={`font-medium ${isCurrentTrack ? "text-green-500" : ""}`}
          >
            {track.title}
          </span>
          <span className="text-sm text-gray-500">{track.artist}</span>
        </div>
      </div>
      <div className="flex items-center gap-8 text-sm">
        <QueueButton track={track} />
        <span>{track.duration}</span>
      </div>
    </div>
  );
};

export default Track;
