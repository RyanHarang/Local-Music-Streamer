import Songlist from "../components/Songlist/Songlist.jsx";
import BackButton from "../components/Controls/Buttons/BackButton.jsx";
import libraryData from "../data/library.json";

const PlaylistPage = ({ playlist, goBack }) => {
  const { tracks } = libraryData;
  const tracksArray = Object.values(tracks);

  const playlistTracks = playlist.tracks
    .map((track) => {
      const fullTrack = tracks[track.id];
      return fullTrack ? { ...fullTrack, order: track.order } : null;
    })
    .filter(Boolean);

  const sortedPlaylistTracks = playlistTracks.sort((a, b) => a.order - b.order);
  return (
    <div className="p-4">
      <BackButton goBack={goBack} />

      <div className="mb-6 flex gap-6">
        {/* <img
          src={playlist.cover}
          alt={`${playlist.title} cover`}
          className="h-48 w-48 rounded object-cover shadow-lg"
        /> */}
        <div>
          <h1 className="text-3xl font-bold">{playlist.name}</h1>
          <p className="text-gray-500">Tracks: {playlist.trackCount}</p>
        </div>
      </div>

      <Songlist tracks={sortedPlaylistTracks} />
    </div>
  );
};

export default PlaylistPage;
