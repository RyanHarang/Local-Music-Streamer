import { usePlayer } from "../../context/PlayerContext.jsx";
import TrashButton from "../Controls/Buttons/TrashButton.jsx";

const Queue = () => {
  const { queue, clearQueue } = usePlayer();
  return (
    <div className="flex h-full w-full flex-col">
      {queue.length === 0 ? (
        <h2 className="text-md font-semibold">Empty</h2>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="text-md font-semibold">Queue</h2>
          <button
            onClick={clearQueue}
            className="text-light-fg2 dark:text-dark-fg2 dark:hover:text-dark-fg hover:text-light-fg p-1 text-xs font-medium hover:underline"
          >
            Clear Queue
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {queue.map((track, index) => (
          <div
            key={index}
            className="dark:hover:bg-dark-bg3 hover:bg-light-bg2 cursor-pointer rounded px-2 py-1 transition"
          >
            <div className="flex items-center justify-between">
              <span className="p-1 text-sm font-medium">{track.title}</span>
              <span className="text-xs text-gray-500">{track.artist}</span>
              <TrashButton track={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queue;
