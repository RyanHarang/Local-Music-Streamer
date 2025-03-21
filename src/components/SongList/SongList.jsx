import Track from "../Track/Track.jsx";

const SongList = ({ tracks, currentTrackId }) => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md border border-gray-300 dark:border-gray-700">
      {tracks.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No songs available</div>
      ) : (
        tracks.map((track, index) => (
          <Track
            key={track.id}
            track={track}
            index={index}
            isPlaying={track.id === currentTrackId}
          />
        ))
      )}
    </div>
  );
};

export default SongList;
