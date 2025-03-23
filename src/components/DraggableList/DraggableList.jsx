import { useState, useRef, useEffect } from "react";

/**
 * A reusable wrapper component that adds drag-and-drop functionality to lists
 *
 * @param {Object} props
 * @param {Array} props.items - The array of items to render
 * @param {Function} props.setItems - Function to update the items array
 * @param {Function} props.renderItem - Function to render each item
 * @param {Function} props.renderDropIndicator - Function to render the drop indicator (optional)
 * @param {string} props.className - Additional CSS classes for the container
 * @param {Object} props.containerProps - Additional props for the container
 */
const DraggableList = ({
  items,
  setItems,
  renderItem,
  renderDropIndicator = (index) => (
    <div className="bg-accent my-1 h-1 w-full" />
  ),
  className = "",
  containerProps = {},
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const draggedItemRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (draggedIndex === null) return;

    const handleDocumentDragOver = (e) => {
      e.preventDefault();
      const isWithinContainer = containerRef.current?.contains(e.target);

      if (!isWithinContainer) {
        setDropTargetIndex(null);
      }
    };

    const handleDocumentDrop = (e) => {
      e.preventDefault();

      if (
        draggedIndex !== null &&
        dropTargetIndex !== null &&
        draggedIndex !== dropTargetIndex
      ) {
        const newItems = [...items];
        newItems.splice(draggedIndex, 1);
        const adjustedTargetIndex =
          draggedIndex < dropTargetIndex
            ? dropTargetIndex - 1
            : dropTargetIndex;
        newItems.splice(adjustedTargetIndex, 0, draggedItemRef.current);
        setItems(newItems);
      }

      setDraggedIndex(null);
      setDropTargetIndex(null);
    };

    document.addEventListener("dragover", handleDocumentDragOver);
    document.addEventListener("drop", handleDocumentDrop);

    return () => {
      document.removeEventListener("dragover", handleDocumentDragOver);
      document.removeEventListener("drop", handleDocumentDrop);
    };
  }, [draggedIndex, dropTargetIndex, items, setItems]);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    draggedItemRef.current = items[index];

    if (e.target.classList) {
      setTimeout(() => {
        e.target.classList.add("opacity-50");
      }, 0);
    }

    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e) => {
    if (e.target.classList) {
      e.target.classList.remove("opacity-50");
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (index !== draggedIndex) {
      setDropTargetIndex(index);
    }

    return false;
  };

  const handleDrop = (e) => {
    e.preventDefault();
  };

  const handleContainerDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      className={`${className}`}
      ref={containerRef}
      onDragOver={handleContainerDragOver}
      {...containerProps}
    >
      {items.map((item, index) => (
        <div key={index}>
          {dropTargetIndex === index &&
            draggedIndex !== index &&
            renderDropIndicator(index)}
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
            className={draggedIndex === index ? "opacity-50" : ""}
          >
            {renderItem({
              item,
              index,
              isDragging: draggedIndex === index,
              dragHandleProps: {
                className: "cursor-grab active:cursor-grabbing",
              },
            })}
          </div>
        </div>
      ))}
      <div
        onDragOver={(e) => handleDragOver(e, items.length)}
        onDrop={handleDrop}
        className="flex h-4 w-full items-center justify-center"
      >
        {dropTargetIndex === items.length && renderDropIndicator(items.length)}
      </div>
    </div>
  );
};

export default DraggableList;
