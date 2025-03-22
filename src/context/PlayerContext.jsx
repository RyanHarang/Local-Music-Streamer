import React, { createContext, useState, useContext } from "react";

const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  const play = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const skipNext = () => {
    const nextTrack = queue[1];
    if (nextTrack) {
      setQueue((prevQueue) => prevQueue.slice(1));
      setCurrentTrack(nextTrack);
    }
  };

  const skipPrev = () => {
    const prevTrack = queue[queue.length - 2];
    if (prevTrack) {
      setQueue((prevQueue) => [prevTrack, ...prevQueue.slice(0, -1)]);
      setCurrentTrack(prevTrack);
    }
  };

  const addToQueue = (track) => {
    setQueue((prevQueue) => [...prevQueue, track]);
  };

  const removeFromQueue = (index) => {
    setQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      newQueue.splice(index, 1);
      return newQueue;
    });
  };

  const setPlayerVolume = (newVolume) => {
    if (newVolume >= 0 && newVolume <= 100) {
      setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const value = {
    isPlaying,
    currentTrack,
    queue,
    volume,
    isMuted,
    play,
    pause,
    skipNext,
    skipPrev,
    addToQueue,
    removeFromQueue,
    setPlayerVolume,
    toggleMute,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
