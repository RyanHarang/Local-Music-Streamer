import Songlist from "../Songlist/Songlist.jsx";

const Library = () => {
  // Placeholder data
  const tracks = [
    {
      id: 1,
      title: "On 1",
      artist: "Yeat",
      duration: "3:04",
      path: "/sampleAudio/13-on-1.flac",
    },
    {
      id: 2,
      title: "For Lyfe",
      artist: "Yeat",
      duration: "2:22",
      path: "/sampleAudio/24-for-lyfe.flac",
    },
  ];

  return <Songlist tracks={tracks} />;
};

export default Library;
