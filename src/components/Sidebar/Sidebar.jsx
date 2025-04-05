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
      className={`relative flex flex-col border-r py-4 pl-2 transition-all duration-300 ${
        isCollapsed ? "w-8" : "w-64"
      }`}
    >
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="group absolute right-0 bottom-0 flex cursor-pointer items-center justify-center p-2"
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
      {showContent && (
        <div className="scrollbar-thin h-full flex-1 overflow-y-auto">
          <Queue />
          <hr className="my-8" />
          <UpcomingSongs />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
