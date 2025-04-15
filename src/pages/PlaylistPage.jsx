import { useEffect, useState } from "react";
import { useNavigation } from "../context/NavigationContext.jsx";
import { usePlayer } from "../context/PlayerContext.jsx";
import { usePlaylists } from "../context/PlaylistContext";
import Playlist from "../components/Playlists/Playlist.jsx";
import BackButton from "../components/Controls/Buttons/BackButton.jsx";

const PlaylistPage = () => {
  const {
    selectedPlaylist,
    currentPage,
    previousPage,
    goToPreviousPage,
    goToHomePage,
  } = useNavigation();

  return (
    <div className="p-4">
      <BackButton
        handleClick={
          previousPage && previousPage !== currentPage
            ? goToPreviousPage
            : () => goToHomePage
        }
      />
      <Playlist playlist={selectedPlaylist} onPlaylistPage={true} />
    </div>
  );
};

export default PlaylistPage;
