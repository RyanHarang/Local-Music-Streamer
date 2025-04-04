import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlaylists } from "../../context/PlaylistContext.jsx";

const LikedSongs = () => {
  const { goToLikedSongPage } = useNavigation();
  const { likedSongs } = usePlaylists();

  return (
    <section className="space-y-8 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Liked Songs</h2>
      </div>

      <div className="w-full">
        <div
          onClick={() => goToLikedSongPage(likedSongs)}
          className="via-accent/40 hover:bg-accent from-accent flex cursor-pointer items-center justify-center rounded bg-gradient-to-b to-black p-3 shadow transition-all duration-200"
        >
          <div className="flex w-full justify-between">
            <div>
              <h3 className="mt-2 text-lg font-semibold group-hover:underline">
                {likedSongs.name}
              </h3>
              <span className="text-dark-fg2 text-sm">
                {likedSongs.trackCount} tracks
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LikedSongs;
