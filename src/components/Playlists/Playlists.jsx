const Playlists = ({ onPlaylistClick }) => {
  // Placeholder data
  const playlists = [
    {
      id: 1,
      title: "Chill Vibes",
      creator: "You",
      description: "Relaxing beats to focus.",
      cover: "/covers/chill-vibes.jpg",
      tracks: [
        {
          id: 1,
          title: "Smooth Track",
          artist: "Cool Artist",
          duration: "3:30",
        },
        { id: 2, title: "Relaxation", artist: "Zen Master", duration: "4:10" },
      ],
    },
    // Add more
  ];

  return (
    <section className="space-y-8 p-4">
      <h2 className="mb-4 text-2xl font-bold">Playlists</h2>
      <div className="grid grid-cols-2 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => onPlaylistClick(playlist)}
            className="cursor-pointer rounded p-4 shadow hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <img
              src={playlist.cover}
              alt={playlist.title}
              className="h-32 w-full rounded object-cover"
            />
            <h3 className="mt-2 text-lg font-semibold">{playlist.title}</h3>
            <p className="text-sm text-gray-500">{playlist.creator}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Playlists;
