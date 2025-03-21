import { useState } from "react";
import MutedIcon from "../../assets/svg/controls/MutedIcon.jsx";
import VolumeIcon from "../../assets/svg/controls/VolumeIcon.jsx";

const VolumeControls = ({ onVolumeChange }) => {
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    onVolumeChange(e.target.value); // Pass volume change to parent
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    onVolumeChange(isMuted ? volume : 0); // Pass mute state to parent
  };

  return (
    <div className="flex w-1/3 items-center justify-end gap-2">
      <button onClick={handleMute} className="group cursor-pointer">
        {volume == 0 || isMuted ? <MutedIcon /> : <VolumeIcon />}
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
