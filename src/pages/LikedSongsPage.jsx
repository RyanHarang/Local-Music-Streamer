import { useNavigation } from "../context/NavigationContext.jsx";
import BackButton from "../components/Controls/Buttons/BackButton.jsx";
import LikedSongs from "../components/LikedSongs/LikedSongs.jsx";

const LikedSongsPage = () => {
  const { currentPage, previousPage, goToPreviousPage, goToHomePage } =
    useNavigation();

  return (
    <div className="p-4">
      <BackButton
        handleClick={
          previousPage && previousPage !== currentPage
            ? goToPreviousPage
            : goToHomePage
        }
      />
      <LikedSongs onLikedSongsPage={true} />
    </div>
  );
};

export default LikedSongsPage;
