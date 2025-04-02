import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";

const AudioPlayer = () => {
  const {
    currentTrack,
    currentCover,
    isMuted,
    isPlaying,
    play,
    pause,
    playNextTrack,
    setSeekToFn,
    skipNext,
    skipPrev,
    updateTime,
    volume,
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

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack?.title || "Unknown Title",
        artist: currentTrack?.artists?.join(", ") || "Unknown Artist",
        album: currentTrack?.albumName || "Unknown Album",
        artwork: [
          {
            src: currentCover || "",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => play(currentTrack));
      navigator.mediaSession.setActionHandler("pause", pause);
      navigator.mediaSession.setActionHandler("previoustrack", skipPrev);
      navigator.mediaSession.setActionHandler("nexttrack", skipNext);
    }
  }, [currentTrack, isPlaying, play, pause, skipPrev, skipNext]);

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
