import { useEffect, useRef } from "react";
import { useNavigation } from "../context/NavigationContext.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import NowPlaying from "../components/NowPlaying/NowPlaying.jsx";
import Navigation from "../components/Navigation/Navigation.jsx";

const Layout = ({ children }) => {
  const { currentPage, getScrollPosition, saveScrollPosition } =
    useNavigation();
  const mainRef = useRef(null);
  const previousPageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        saveScrollPosition(currentPage, mainRef.current.scrollTop);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentPage, saveScrollPosition]);

  useEffect(() => {
    if (previousPageRef.current !== currentPage) {
      const isNavigatingToLibrary = currentPage === "library";
      const shouldRestoreScroll =
        isNavigatingToLibrary &&
        previousPageRef.current !== null &&
        previousPageRef.current !== "library";

      if (shouldRestoreScroll && mainRef.current) {
        requestAnimationFrame(() => {
          if (mainRef.current) {
            mainRef.current.scrollTop = getScrollPosition(currentPage);
          }
        });
      } else if (currentPage === "album" || currentPage === "playlist") {
        if (mainRef.current) {
          mainRef.current.scrollTop = 0;
        }
      } else if (mainRef.current) {
        mainRef.current.scrollTop = getScrollPosition(currentPage);
      }

      previousPageRef.current = currentPage;
    }
  }, [currentPage, getScrollPosition]);

  return (
    <div className="flex h-screen flex-col">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main ref={mainRef} className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
      <NowPlaying />
    </div>
  );
};

export default Layout;
