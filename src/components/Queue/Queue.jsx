// // import { useState, useRef } from "react";
// // import { usePlayer } from "../../context/PlayerContext.jsx";
// // import TrashButton from "../Controls/Buttons/TrashButton.jsx";

// // const Queue = () => {
// //   const { queue, clearQueue, setQueue } = usePlayer();
// //   const [draggedIndex, setDraggedIndex] = useState(null);
// //   const [dropTargetIndex, setDropTargetIndex] = useState(null);
// //   const draggedItemRef = useRef(null);
// //   const queueContainerRef = useRef(null);

// //   const handleDragStart = (e, index) => {
// //     setDraggedIndex(index);
// //     draggedItemRef.current = queue[index];

// //     if (e.target.classList) {
// //       setTimeout(() => {
// //         e.target.classList.add("opacity-50");
// //       }, 0);
// //     }

// //     e.dataTransfer.effectAllowed = "move";
// //   };

// //   const handleDragEnd = (e) => {
// //     setDraggedIndex(null);
// //     setDropTargetIndex(null);
// //     if (e.target.classList) {
// //       e.target.classList.remove("opacity-50");
// //     }
// //   };

// //   const handleDragOver = (e, index) => {
// //     e.preventDefault();
// //     e.dataTransfer.dropEffect = "move";
// //     const isWithinContainer = queueContainerRef.current?.contains(e.target);

// //     if (isWithinContainer && index !== draggedIndex) {
// //       setDropTargetIndex(index);
// //     }

// //     return false;
// //   };

// //   const handleDragLeave = (e) => {
// //     const isLeavingContainer = !queueContainerRef.current?.contains(
// //       e.relatedTarget,
// //     );

// //     if (isLeavingContainer) {
// //       setDropTargetIndex(null);
// //     }
// //   };

// //   const handleDrop = (e, targetIndex) => {
// //     e.preventDefault();
// //     const isWithinContainer = queueContainerRef.current?.contains(e.target);

// //     if (!isWithinContainer) {
// //       setDraggedIndex(null);
// //       setDropTargetIndex(null);
// //       return;
// //     }

// //     if (draggedIndex === null || draggedIndex === targetIndex) return;

// //     const newQueue = [...queue];
// //     newQueue.splice(draggedIndex, 1);

// //     const adjustedTargetIndex =
// //       draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
// //     newQueue.splice(adjustedTargetIndex, 0, draggedItemRef.current);

// //     setQueue(newQueue);
// //     setDraggedIndex(null);
// //     setDropTargetIndex(null);
// //   };

// //   const handleContainerDragOver = (e) => {
// //     e.preventDefault();
// //     e.dataTransfer.dropEffect = "move";
// //   };

// //   return (
// //     <div
// //       className="flex w-full flex-col"
// //       ref={queueContainerRef}
// //       onDragLeave={handleDragLeave}
// //     >
// //       {queue && queue.length === 0 ? (
// //         <h2 className="text-md font-semibold">Queue Empty</h2>
// //       ) : (
// //         <div className="flex items-center justify-between">
// //           <h2 className="text-md font-semibold">Queue</h2>
// //           <button
// //             onClick={clearQueue}
// //             className="text-light-fg2 dark:text-dark-fg2 dark:hover:text-dark-fg hover:text-light-fg p-1 text-xs font-medium hover:underline"
// //           >
// //             Clear Queue
// //           </button>
// //         </div>
// //       )}
// //       <div
// //         className="flex-1 overflow-y-auto"
// //         onDragOver={handleContainerDragOver}
// //       >
// //         {queue.map((track, index) => (
// //           <div key={index}>
// //             {dropTargetIndex === index && draggedIndex !== index && (
// //               <div className="bg-accent my-1 h-1 w-full" />
// //             )}

// //             <div
// //               draggable
// //               onDragStart={(e) => handleDragStart(e, index)}
// //               onDragEnd={handleDragEnd}
// //               onDragOver={(e) => handleDragOver(e, index)}
// //               onDrop={(e) => handleDrop(e, index)}
// //               className={`dark:hover:bg-dark-bg3 hover:bg-light-bg2 cursor-grab rounded px-2 py-1 transition active:cursor-grabbing ${
// //                 draggedIndex === index ? "opacity-50" : ""
// //               }`}
// //             >
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-2">
// //                   <span className="text-light-fg2 dark:text-dark-fg2 cursor-grab">
// //                     ≡
// //                   </span>
// //                   <span className="p-1 text-sm font-medium">{track.title}</span>
// //                 </div>
// //                 <span className="text-xs text-gray-500">{track.artist}</span>
// //                 <TrashButton index={index} />
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //         <div
// //           onDragOver={(e) => handleDragOver(e, queue.length)}
// //           onDrop={(e) => handleDrop(e, queue.length)}
// //           className="flex h-4 w-full items-center justify-center"
// //         >
// //           {dropTargetIndex === queue.length && (
// //             <div className="bg-accent h-1 w-full" />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Queue;

// import { useState, useRef, useEffect } from "react";
// import { usePlayer } from "../../context/PlayerContext.jsx";
// import TrashButton from "../Controls/Buttons/TrashButton.jsx";

// const Queue = () => {
//   const { queue, clearQueue, setQueue } = usePlayer();
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [dropTargetIndex, setDropTargetIndex] = useState(null);
//   const draggedItemRef = useRef(null);
//   const queueContainerRef = useRef(null);

//   useEffect(() => {
//     if (draggedIndex === null) return;

//     const handleDocumentDragOver = (e) => {
//       e.preventDefault();
//       const isWithinContainer = queueContainerRef.current?.contains(e.target);

//       if (!isWithinContainer) {
//         setDropTargetIndex(null);
//       }
//     };

//     const handleDocumentDrop = (e) => {
//       e.preventDefault();

//       if (
//         draggedIndex !== null &&
//         dropTargetIndex !== null &&
//         draggedIndex !== dropTargetIndex
//       ) {
//         const newQueue = [...queue];
//         newQueue.splice(draggedIndex, 1);
//         const adjustedTargetIndex =
//           draggedIndex < dropTargetIndex
//             ? dropTargetIndex - 1
//             : dropTargetIndex;
//         newQueue.splice(adjustedTargetIndex, 0, draggedItemRef.current);
//         setQueue(newQueue);
//       }

//       setDraggedIndex(null);
//       setDropTargetIndex(null);
//     };

//     document.addEventListener("dragover", handleDocumentDragOver);
//     document.addEventListener("drop", handleDocumentDrop);

//     return () => {
//       document.removeEventListener("dragover", handleDocumentDragOver);
//       document.removeEventListener("drop", handleDocumentDrop);
//     };
//   }, [draggedIndex, dropTargetIndex, queue, setQueue]);

//   const handleDragStart = (e, index) => {
//     setDraggedIndex(index);
//     draggedItemRef.current = queue[index];

//     if (e.target.classList) {
//       setTimeout(() => {
//         e.target.classList.add("opacity-50");
//       }, 0);
//     }

//     e.dataTransfer.effectAllowed = "move";
//   };

//   const handleDragEnd = (e) => {
//     if (e.target.classList) {
//       e.target.classList.remove("opacity-50");
//     }
//   };

//   const handleDragOver = (e, index) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";

//     if (index !== draggedIndex) {
//       setDropTargetIndex(index);
//     }

//     return false;
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//   };

//   const handleContainerDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";
//   };

//   return (
//     <div className="flex w-full flex-col" ref={queueContainerRef}>
//       {queue && queue.length === 0 ? (
//         <h2 className="text-md font-semibold">Queue Empty</h2>
//       ) : (
//         <div className="flex items-center justify-between">
//           <h2 className="text-md font-semibold">Queue</h2>
//           <button
//             onClick={clearQueue}
//             className="text-light-fg2 dark:text-dark-fg2 dark:hover:text-dark-fg hover:text-light-fg p-1 text-xs font-medium hover:underline"
//           >
//             Clear Queue
//           </button>
//         </div>
//       )}
//       <div
//         className="flex-1 overflow-y-auto"
//         onDragOver={handleContainerDragOver}
//       >
//         {queue.map((track, index) => (
//           <div key={index}>
//             {dropTargetIndex === index && draggedIndex !== index && (
//               <div className="bg-accent my-1 h-1 w-full" />
//             )}
//             <div
//               draggable
//               onDragStart={(e) => handleDragStart(e, index)}
//               onDragEnd={handleDragEnd}
//               onDragOver={(e) => handleDragOver(e, index)}
//               onDrop={handleDrop}
//               className={`dark:hover:bg-dark-bg3 hover:bg-light-bg2 cursor-grab rounded px-2 py-1 transition active:cursor-grabbing ${
//                 draggedIndex === index ? "opacity-50" : ""
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span className="text-light-fg2 dark:text-dark-fg2 cursor-grab">
//                     ≡
//                   </span>
//                   <span className="p-1 text-sm font-medium">{track.title}</span>
//                 </div>
//                 <span className="text-xs text-gray-500">{track.artist}</span>
//                 <TrashButton index={index} />
//               </div>
//             </div>
//           </div>
//         ))}
//         <div
//           onDragOver={(e) => handleDragOver(e, queue.length)}
//           onDrop={handleDrop}
//           className="flex h-4 w-full items-center justify-center"
//         >
//           {dropTargetIndex === queue.length && (
//             <div className="bg-accent h-1 w-full" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Queue;

import { usePlayer } from "../../context/PlayerContext.jsx";
import TrashButton from "../Controls/Buttons/TrashButton.jsx";
import DraggableList from "../DraggableList/DraggableList.jsx";

const Queue = () => {
  const { queue, clearQueue, setQueue } = usePlayer();

  const renderQueueItem = ({ item: track, index, dragHandleProps }) => (
    <div className="dark:hover:bg-dark-bg3 hover:bg-light-bg2 cursor-grab rounded px-2 py-1 transition active:cursor-grabbing">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-light-fg2 dark:text-dark-fg2"
            {...dragHandleProps}
          >
            ≡
          </span>
          <span className="p-1 text-sm font-medium">{track.title}</span>
        </div>
        <span className="text-xs text-gray-500">{track.artist}</span>
        <TrashButton index={index} />
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
