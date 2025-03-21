const Queue = () => {
  // Mock data for the queue
  const queue = [
    { id: 1, title: "Next Song 1", artist: "Artist A", duration: "3:12" },
    { id: 2, title: "Next Song 2", artist: "Artist B", duration: "4:05" },
    { id: 3, title: "Next Song 3", artist: "Artist C", duration: "2:45" },
    { id: 4, title: "Next Song 4", artist: "Artist D", duration: "3:50" },
    { id: 5, title: "Next Song 5", artist: "Artist E", duration: "4:20" },
    { id: 6, title: "Next Song 1", artist: "Artist A", duration: "3:12" },
    { id: 7, title: "Next Song 2", artist: "Artist B", duration: "4:05" },
    { id: 8, title: "Next Song 3", artist: "Artist C", duration: "2:45" },
    { id: 9, title: "Next Song 4", artist: "Artist D", duration: "3:50" },
    { id: 10, title: "Next Song 5", artist: "Artist E", duration: "4:20" },
  ];

  return (
    <div className="flex h-full flex-col">
      <h2 className="text-md mb-4 font-semibold">Queue</h2>

      <div className="flex-1 overflow-y-auto pr-2">
        {queue.map((track) => (
          <div
            key={track.id}
            className="mb-2 cursor-pointer rounded px-2 py-1 transition hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <p className="text-sm font-medium">{track.title}</p>
            <p className="text-xs text-gray-500">{track.artist}</p>
            <span className="text-xs text-gray-400">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queue;
