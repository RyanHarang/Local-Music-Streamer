import Album from "../components/Album/Album.jsx";
import BackButton from "../components/Controls/Buttons/BackButton.jsx";

const AlbumPage = ({ album, goBack }) => {
  return (
    <div className="p-4">
      <BackButton goBack={goBack} />
      <Album album={album} onAlbumPage={true} />
    </div>
  );
};

export default AlbumPage;
