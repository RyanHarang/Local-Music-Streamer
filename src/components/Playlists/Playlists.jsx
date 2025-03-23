const Playlists = ({ onPlaylistClick }) => {
  // Placeholder data
  const playlists = [
    {
      id: 1,
      title: "LS",
      creator: "You",
      description: "Testing",
      cover: "/covers/chill-vibes.jpg",
      tracks: [
        {
          id: 1,
          title: "ON 1",
          artist: "Yeat",
          duration: "3:04",
          path: "/sampleAudio/13-on-1.flac",
        },
        {
          id: 2,
          title: "FOR LYFE",
          artist: "Yeat",
          duration: "2:22",
          path: "/sampleAudio/24-for-lyfe.flac",
        },
        {
          id: 3,
          title: "STFU",
          artist: "Yeat",
          duration: "1:44",
          path: "/sampleAudio/02-stfu.flac",
        },
        {
          id: 4,
          title: "SPEEDBALL",
          artist: "Yeat",
          duration: "2:24",
          path: "/sampleAudio/05-speedball.flac",
        },
        {
          id: 5,
          title: "ORCHESTRATE",
          artist: "Yeat",
          duration: "3:14",
          path: "/sampleAudio/07-orchestratë.flac",
        },
        {
          id: 6,
          title: "LYFE PARTY",
          artist: "Yeat",
          duration: "2:44",
          path: "/sampleAudio/21-lyfe-party.flac",
        },
        {
          id: 7,
          title: "FATE",
          artist: "Yeat",
          duration: "3:02",
          path: "/sampleAudio/22-fatë-(bonus).flac",
        },
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
