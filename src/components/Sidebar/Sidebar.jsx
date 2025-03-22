import { useState } from "react";
import Queue from "../Queue/Queue.jsx";
import ChevronLeftIcon from "../../assets/svg/sidebar/ChevronLeftIcon.jsx";
import ChevronRightIcon from "../../assets/svg/sidebar/ChevronRightIcon.jsx";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showQueue, setShowQueue] = useState(true);

  const toggleSidebar = () => {
    if (!isCollapsed) {
      setShowQueue(false);
    } else {
      setTimeout(() => {
        setShowQueue(true);
      }, 200);
    }

    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`relative flex flex-col border-r p-4 transition-all duration-300 ${
        isCollapsed ? "w-2" : "w-64"
      }`}
    >
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="absolute right-1 bottom-2 z-10 flex h-6 w-6 items-center justify-center"
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
      {showQueue && <Queue />}
    </aside>
  );
};

export default Sidebar;
