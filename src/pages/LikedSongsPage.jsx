import { useEffect, useState } from "react";
import { useNavigation } from "../context/NavigationContext.jsx";
import { usePlayer } from "../context/PlayerContext.jsx";
import { usePlaylists } from "../context/PlaylistContext";
import Songlist from "../components/Songlist/Songlist.jsx";
import BackButton from "../components/Controls/Buttons/BackButton.jsx";

const LikedSongsPage = () => {
  const { selectedPlaylist, previousPage, goToPreviousPage, goToHomePage } =
    useNavigation();
  const { library } = usePlayer();
  const { likedSongs } = usePlaylists();
  const [currentPlaylist, setCurrentPlaylist] = useState(selectedPlaylist);
  const tracks = library.tracks;

  useEffect(() => {
    setCurrentPlaylist(likedSongs);
  }, [likedSongs]);

  const likedSongTracks = currentPlaylist.tracks
    .map((track) => {
      const fullTrack = tracks[track.id];
      return fullTrack ? { ...fullTrack } : null;
    })
    .filter(Boolean);

  return (
    <div className="p-4">
      <BackButton
        handleClick={previousPage ? goToPreviousPage : goToHomePage}
      />

      <div className="mb-2">
        <h1 className="cursor-pointer text-3xl font-bold">
          {currentPlaylist.name}
        </h1>

        <p className="text-dark-fg3">Tracks: {currentPlaylist.trackCount}</p>
      </div>
      <Songlist tracks={likedSongTracks} />
    </div>
  );
};

export default LikedSongsPage;
