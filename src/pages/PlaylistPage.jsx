import Songlist from "../components/Songlist/Songlist.jsx";
import BackButton from "../components/Controls/Buttons/BackButton.jsx";

const PlaylistPage = ({ playlist, goBack }) => {
  return (
    <div className="p-4">
      <BackButton goBack={goBack} />

      <div className="mb-6 flex gap-6">
        <img
          src={playlist.cover}
          alt={`${playlist.title} cover`}
          className="h-48 w-48 rounded object-cover shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{playlist.title}</h1>
          <p className="text-lg text-gray-500">By {playlist.creator}</p>
          {playlist.description && (
            <p className="mt-2 text-sm text-gray-400">{playlist.description}</p>
          )}
          <button
            onClick={() => handlePlay(playlist.tracks[0])}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Play
          </button>
        </div>
      </div>

      <Songlist tracks={playlist.tracks} />
    </div>
  );
};

export default PlaylistPage;
