import { useState } from "react";
import Queue from "../Queue/Queue.jsx";
import UpcomingSongs from "../UpcomingSongs/UpcomingSongs.jsx";
import ChevronLeftIcon from "../../assets/svg/sidebar/ChevronLeftIcon.jsx";
import ChevronRightIcon from "../../assets/svg/sidebar/ChevronRightIcon.jsx";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const toggleSidebar = () => {
    if (!isCollapsed) {
      setShowContent(false);
    } else {
      setTimeout(() => {
        setShowContent(true);
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
        className="group absolute right-2 bottom-2 flex cursor-pointer items-center justify-center"
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
      {showContent && (
        <div className="scrollbar-thin scrollbar-track-transparent h-full flex-1 overflow-y-auto">
          <Queue />
          <hr className="my-8" />
          <UpcomingSongs />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
