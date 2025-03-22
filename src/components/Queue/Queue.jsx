import { useState, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";
import TrashButton from "../Controls/Buttons/TrashButton.jsx";

const Queue = () => {
  const { queue, clearQueue, setQueue } = usePlayer();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const draggedItemRef = useRef(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    draggedItemRef.current = queue[index];

    if (e.target.classList) {
      setTimeout(() => {
        e.target.classList.add("opacity-50");
      }, 0);
    }

    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e) => {
    setDraggedIndex(null);
    if (e.target.classList) {
      e.target.classList.remove("opacity-50");
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newQueue = [...queue];
    newQueue.splice(draggedIndex, 1);
    newQueue.splice(targetIndex, 0, draggedItemRef.current);

    setQueue(newQueue);
    setDraggedIndex(null);
  };

  return (
    <div className="flex w-full flex-col">
      {queue && queue.length === 0 ? (
        <h2 className="text-md font-semibold">Queue Empty</h2>
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
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            className="dark:hover:bg-dark-bg3 hover:bg-light-bg2 cursor-grab rounded px-2 py-1 transition active:cursor-grabbing"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-light-fg2 dark:text-dark-fg2">≡</span>
                <span className="p-1 text-sm font-medium">{track.title}</span>
              </div>
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
