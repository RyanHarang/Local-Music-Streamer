import Album from "../components/Album/Album.jsx";
import BackButton from "../components/Controls/Buttons/BackButton.jsx";

const AlbumPage = ({ album, goBack }) => {
  const { albumName, albumData } = album;

  return (
    <div className="p-4">
      <BackButton goBack={goBack} />
      <Album albumName={albumName} albumData={albumData} showTracks={true} />
    </div>
  );
};

export default AlbumPage;
