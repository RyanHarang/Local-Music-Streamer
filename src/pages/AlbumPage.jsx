import { useNavigation } from "../context/NavigationContext.jsx";
import Album from "../components/Album/Album.jsx";
import BackButton from "../components/Controls/Buttons/BackButton.jsx";

const AlbumPage = () => {
  const { selectedAlbum, previousPage, goToPreviousPage, goToLibraryPage } =
    useNavigation();
  return (
    <div className="p-4">
      <BackButton goBack={previousPage ? goToPreviousPage : goToLibraryPage} />
      <Album album={selectedAlbum} onAlbumPage={true} />
    </div>
  );
};

export default AlbumPage;
