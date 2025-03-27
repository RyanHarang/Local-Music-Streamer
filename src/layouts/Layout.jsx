import { useEffect, useRef } from "react";
import { useNavigation } from "../context/NavigationContext.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import NowPlaying from "../components/NowPlaying/NowPlaying.jsx";
import Navigation from "../components/Navigation/Navigation.jsx";

const Layout = ({ children }) => {
  const { currentPage } = useNavigation();
  const mainRef = useRef(null);

  useEffect(() => {
    if (
      mainRef.current &&
      (currentPage === "album" || currentPage === "playlist")
    )
      mainRef.current.scrollTop = 0;
  }, [currentPage]);

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
