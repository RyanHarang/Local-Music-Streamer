import Track from "../Track/Track.jsx";

const Songlist = ({ tracks }) => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md border border-gray-300 dark:border-gray-700">
      {!tracks || tracks.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No songs available</div>
      ) : (
        tracks.map((track, index) => (
          <Track
            key={track.albumArtist + track.title}
            track={track}
            index={index}
            inSonglist={true}
            songlist={tracks}
          />
        ))
      )}
    </div>
  );
};

export default Songlist;
