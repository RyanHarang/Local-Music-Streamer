import { usePlayer } from "../../context/PlayerContext.jsx";
import DraggableList from "../DraggableList/DraggableList.jsx";
import TrashButton from "../Controls/Buttons/TrashButton.jsx";
import GripIcon from "../../assets/svg/sidebar/GripIcon.jsx";

const Queue = () => {
  const { queue, removeFromQueue, clearQueue, setQueue } = usePlayer();

  const renderQueueItem = ({ item: track, index, dragHandleProps }) => (
    <div className="dark:hover:bg-dark-bg3 hover:bg-light-bg2 cursor-grab rounded px-2 py-1 transition active:cursor-grabbing">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-light-fg2 dark:text-dark-fg2"
            {...dragHandleProps}
          >
            <GripIcon />
          </span>
          <div className="flex flex-col">
            <span className="p-1 text-sm font-medium">{track.title}</span>
            <span className="text-xs text-gray-500">{track.artist}</span>
          </div>
        </div>
        <TrashButton handleClick={() => removeFromQueue(index)} />
      </div>
    </div>
  );

  const renderDropIndicator = () => (
    <div className="bg-accent my-1 h-1 w-full" />
  );

  return (
    <div className="flex w-full flex-col">
      {queue && queue.length === 0 ? (
        <h2 className="text-md font-semibold">Queue Empty</h2>
      ) : (
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-md font-semibold">Queue</h2>
          <button
            onClick={clearQueue}
            className="text-light-fg2 dark:text-dark-fg2 dark:hover:text-dark-fg hover:text-light-fg p-1 text-xs font-medium hover:underline"
          >
            Clear Queue
          </button>
        </div>
      )}
      <DraggableList
        items={queue}
        setItems={setQueue}
        renderItem={renderQueueItem}
        renderDropIndicator={renderDropIndicator}
        className="flex-1 overflow-y-auto"
      />
    </div>
  );
};

export default Queue;
