import { usePlayer } from "../../context/PlayerContext.jsx";

const ProgressBar = () => {
  const { currentTime, duration, seekTo } = usePlayer();
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seekTo(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full">
      <div
        className="bg-light-bg3 dark:bg-dark-bg3 relative h-2 w-full cursor-pointer rounded"
        onClick={handleSeek}
      >
        <div
          className="h-2 rounded bg-green-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
