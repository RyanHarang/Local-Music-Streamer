import { usePlayer } from "../../context/PlayerContext.jsx";
import MutedIcon from "../../assets/svg/controls/MutedIcon.jsx";
import NoVolumeIcon from "../../assets/svg/controls/NoVolumeIcon.jsx";
import VolumeIcon from "../../assets/svg/controls/VolumeIcon.jsx";

const VolumeControls = () => {
  const { volume, isMuted, setPlayerVolume, toggleMute } = usePlayer();

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setPlayerVolume(newVolume);
  };

  return (
    <div className="flex w-1/3 items-center justify-end gap-2">
      <button onClick={toggleMute} className="group cursor-pointer">
        {isMuted ? (
          <MutedIcon />
        ) : volume == 0 ? (
          <NoVolumeIcon />
        ) : (
          <VolumeIcon />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => handleVolumeChange(e)}
        className="cursor-pointer"
      />
    </div>
  );
};

export default VolumeControls;
