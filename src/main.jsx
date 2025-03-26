import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PlayerProvider } from "./context/PlayerContext.jsx";
import { PlaylistProvider } from "./context/PlaylistContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlaylistProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </PlaylistProvider>
  </StrictMode>,
);
