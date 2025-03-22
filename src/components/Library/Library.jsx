import SongList from "../SongList/SongList.jsx";

const Library = () => {
  // Placeholder data
  const tracks = [
    {
      id: 1,
      title: "Smooth Track",
      artist: "Cool Artist",
      duration: "3:30",
    },
    { id: 2, title: "Relaxation", artist: "Zen Master", duration: "4:10" },
  ];

  return <SongList tracks={tracks} />;
};

export default Library;
