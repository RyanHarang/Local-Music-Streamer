import { useState } from "react";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Library from "./pages/Library.jsx";
import Settings from "./pages/Settings.jsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "library":
        return <Library />;
      case "settings":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return <Layout onNavChange={setCurrentPage}>{renderPage()}</Layout>;
};

export default App;
