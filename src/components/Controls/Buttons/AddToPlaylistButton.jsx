import PlaylistIcon from "../../../assets/svg/controls/PlaylistIcon.jsx";

const AddToPlaylistButton = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      aria-label="Add to playlists"
      className="group cursor-pointer"
    >
      <PlaylistIcon />
    </button>
  );
};

export default AddToPlaylistButton;
