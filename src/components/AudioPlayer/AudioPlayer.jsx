import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";

const AudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    updateTime,
    setSeekToFn,
    playNextTrack,
    volume,
    isMuted,
  } = usePlayer();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentTrack?.path) {
      if (audioRef.current.src !== currentTrack.path) {
        audioRef.current.src = currentTrack.path;
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    setSeekToFn(() => seekTo);
  }, [setSeekToFn]);

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    updateTime(current, dur);
  };

  const handleLoadedMetadata = () => {
    const dur = audioRef.current.duration || 0;
    updateTime(audioRef.current.currentTime, dur);
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      updateTime(time, audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    playNextTrack();
  };

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
      hidden
    />
  );
};

export default AudioPlayer;
