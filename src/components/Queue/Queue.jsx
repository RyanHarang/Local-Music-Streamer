import { usePlayer } from "../../context/PlayerContext.jsx";
import DraggableList from "../DraggableList/DraggableList.jsx";
import TrashButton from "../Controls/Buttons/TrashButton.jsx";
import GripIcon from "../../assets/svg/sidebar/GripIcon.jsx";

const Queue = () => {
  const { queue, removeFromQueue, clearQueue, setQueue } = usePlayer();

  const renderQueueItem = ({ item: track, index, dragHandleProps }) => (
    <div className="hover:bg-dark-bg3 h-12 cursor-grab overflow-hidden rounded py-1 pr-2 pl-1 transition active:cursor-grabbing">
      <div className="flex h-full items-center justify-between">
        <div className="flex w-4/5 items-center gap-2 overflow-hidden">
          <span className="text-dark-fg2 flex-shrink-0" {...dragHandleProps}>
            <GripIcon />
          </span>
          <div className="flex flex-grow flex-col overflow-hidden">
            <span className="truncate text-sm font-medium">{track.title}</span>
            <span className="text-dark-fg3 truncate text-xs">
              {track.artists}
            </span>
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
            className="text-dark-fg2 hover:text-dark-fg p-1 text-xs font-medium hover:underline"
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
