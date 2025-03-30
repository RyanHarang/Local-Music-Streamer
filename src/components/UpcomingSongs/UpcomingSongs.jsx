import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlayer } from "../../context/PlayerContext.jsx";
import libraryData from "../../data/library.json";

const UpcomingSongs = () => {
  const { goToAlbumPage, goToLibraryPage } = useNavigation();
  const { getUpcomingSongs } = usePlayer();
  const { albums } = libraryData;
  const upcomingTracks = getUpcomingSongs();

  return (
    <div className="flex w-full flex-col">
      {!upcomingTracks || upcomingTracks.length === 0 ? (
        <h2 className="text-md font-semibold">No Upcoming Songs</h2>
      ) : (
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-md font-semibold">Upcoming Songs</h2>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {upcomingTracks &&
          upcomingTracks.map((track, index) => (
            <div
              key={index}
              className="hover:bg-dark-bg3 rounded px-1 py-1 transition"
            >
              <div className="flex flex-col justify-center">
                <span
                  onClick={() => goToAlbumPage(albums[track.albumId])}
                  className="cursor-pointer hover:underline"
                >
                  {track.title}
                </span>
                <span className="text-dark-fg3 text-xs">
                  {track &&
                    Array.isArray(track.artists) &&
                    track.artists.map((artist, index) => (
                      <span
                        key={`${artist}-${index}`}
                        className="hover:text-dark-fg text-dark-fg2 mr-1 cursor-pointer hover:underline"
                        onClick={() => goToLibraryPage(artist)}
                      >
                        {artist}
                        {index < track.artists.length - 1 && ", "}
                      </span>
                    ))}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UpcomingSongs;
