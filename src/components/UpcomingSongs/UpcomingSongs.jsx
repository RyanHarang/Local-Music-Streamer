import { usePlayer } from "../../context/PlayerContext.jsx";

const UpcomingSongs = () => {
  const { getUpcomingSongs } = usePlayer();
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
              className="hover:bg-dark-bg3 cursor-pointer rounded px-2 py-1 transition"
            >
              <div className="flex items-center justify-between">
                <span className="p-1 text-sm font-medium">{track.title}</span>
                <span className="text-xs text-gray-500">{track.artist}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UpcomingSongs;
