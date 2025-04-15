import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlayer } from "../../context/PlayerContext.jsx";
import { usePlaylists } from "../../context/PlaylistContext.jsx";
import Songlist from "../Songlist/Songlist.jsx";
import StartSonglistButton from "../Controls/Buttons/StartSongListButton.jsx";

const LikedSongs = ({ onLikedSongsPage }) => {
  const { goToLikedSongPage } = useNavigation();
  const { library } = usePlayer();
  const { likedSongs } = usePlaylists();
  const tracks = library.tracks;

  const likedSongTracks = likedSongs.tracks
    .map((track) => {
      const fullTrack = tracks[track.id];
      return fullTrack ? { ...fullTrack } : null;
    })
    .filter(Boolean);

  return (
    <div className="@container relative mb-4">
      <div
        onClick={() => goToLikedSongPage(likedSongs)}
        className={`flex items-center gap-4 ${!onLikedSongsPage && "via-accent/40 hover:bg-accent from-accent cursor-pointer rounded bg-gradient-to-bl to-black p-3 shadow transition-all duration-200"}`}
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between pr-3 @xl:flex-col @xl:items-start @xl:justify-center @xl:pr-0">
            <h3 className="text-2xl font-semibold">{likedSongs.name}</h3>
            <StartSonglistButton songlist={likedSongTracks} />
          </div>
          <span className="text-dark-fg2 text-md">
            {likedSongs.trackCount} tracks
          </span>
        </div>
      </div>
      {onLikedSongsPage && <Songlist tracks={likedSongTracks} />}
    </div>
  );
};

export default LikedSongs;
