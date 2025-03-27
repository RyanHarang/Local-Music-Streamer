import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PlaylistProvider } from "./context/PlaylistContext.jsx";
import { PlayerProvider } from "./context/PlayerContext.jsx";
import { NavigationProvider } from "./context/NavigationContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlaylistProvider>
      <PlayerProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </PlayerProvider>
    </PlaylistProvider>
  </StrictMode>,
);
