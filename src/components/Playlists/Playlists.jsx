const Playlists = () => {
  // Placeholder data
  const playlists = [
    { id: 1, name: "Chill Vibes", songCount: 24 },
    { id: 2, name: "Workout Mix", songCount: 15 },
    { id: 3, name: "Old Favorites", songCount: 30 },
  ];

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">Your Playlists</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-light-bg dark:bg-dark-bg hover:bg-light-bg2 dark:hover:bg-dark-bg3 cursor-pointer rounded border p-4 transition"
          >
            <h3 className="text-lg font-bold">{playlist.name}</h3>
            <p className="text-light-fg2 dark:text-dark-fg2 text-sm">
              {playlist.songCount} songs
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Playlists;
