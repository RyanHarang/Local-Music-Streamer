import { useState } from "react";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Library from "./pages/Library.jsx";
import Settings from "./pages/Settings.jsx";
import Navigation from "./components/Navigation/Navigation";

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

  return (
    <Layout>
      <Navigation onNavChange={setCurrentPage} /> {renderPage()}
    </Layout>
  );
};

export default App;
