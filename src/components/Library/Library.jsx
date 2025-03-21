const LibrarySongs = () => {
  // Placeholder data
  const songs = [
    { id: 1, title: "Song A", artist: "Artist 1", duration: "3:45" },
    { id: 2, title: "Song B", artist: "Artist 2", duration: "4:12" },
    { id: 3, title: "Song C", artist: "Artist 3", duration: "2:58" },
  ];

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Your Library</h2>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {songs.map((song) => (
          <div
            key={song.id}
            className="dark:hover:bg-dark-bg3 hover:bg-light-bg2 flex cursor-pointer items-center justify-between px-2 py-2 transition"
          >
            <div>
              <p className="font-medium">{song.title}</p>
              <p className="text-light-fg2 dark:text-dark-fg2 text-sm">
                {song.artist}
              </p>
            </div>
            <span className="text-light-fg2 dark:text-dark-fg2 text-sm">
              {song.duration}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LibrarySongs;
