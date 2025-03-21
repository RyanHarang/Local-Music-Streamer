const Track = ({ track, index, onPlay, isPlaying }) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => onPlay(track)}
    >
      <div className="flex items-center gap-4">
        <span className="w-6 text-center text-sm">{index + 1}</span>
        <div className="flex flex-col">
          <span className="font-medium">{track.title}</span>
          <span className="text-sm text-gray-500">{track.artist}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {isPlaying ? <span className="text-green-500">▶️ Playing</span> : null}
        <span>{track.duration}</span>
      </div>
    </div>
  );
};

export default Track;
