import React, { createContext, useState, useContext } from "react";

/**
 * Context for music player functionality across application
 * @type {React.Context}
 */
const PlayerContext = createContext();

/**
 * Custom hook to access PlayerContext
 * @returns {Object} Player context values and methods
 */
export const usePlayer = () => useContext(PlayerContext);

/**
 * Provider component that wraps  application to make player state available
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render within provider
 * @returns {JSX.Element} Provider component with player context
 */
export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const [queue, setQueue] = useState([]);
  const [activeSonglist, setActiveSonglist] = useState(null);
  const [songlistIndex, setSonglistIndex] = useState(0);

  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekToFn, setSeekToFn] = useState(() => () => {});

  /**
   * Starts playing a track
   * @param {Object} track - Track to play
   */
  const play = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  /**
   * Replays current track from beginning
   */
  const replay = () => {
    pause();
    restart();
    setTimeout(() => {
      play(currentTrack);
    }, 0);
  };

  /**
   * Pauses current track
   */
  const pause = () => {
    setIsPlaying(false);
  };

  /**
   * Moves seek head to 0
   */
  const restart = () => {
    if (seekToFn) seekToFn(0);
  };

  /**
   * Checks if next track is same as current and handles playback accordingly
   * @param {Object} nextTrack - Track to check
   */
  const checkNextTrack = (nextTrack) => {
    if (nextTrack === currentTrack) replay();
    else play(nextTrack);
  };

  /**
   * Skips to next track in queue or songlist
   */
  const skipNext = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue((prevQueue) => prevQueue.slice(1));
      checkNextTrack(nextTrack);
    } else if (activeSonglist && songlistIndex < activeSonglist.length - 1) {
      const nextTrack = activeSonglist[songlistIndex + 1];
      setSonglistIndex((prevIndex) => prevIndex + 1);
      play(nextTrack);
    }
  };

  /**
   * Skips to previous track in songlist or restarts current track if played for over 3 seconds
   */
  const skipPrev = () => {
    if (currentTime > 3) {
      restart();
    } else if (songlistIndex > 0 && activeSonglist) {
      const prevTrack = activeSonglist[songlistIndex - 1];
      setSonglistIndex((prevIndex) => prevIndex - 1);
      checkNextTrack(prevTrack);
    }
  };

  /**
   * Automatically plays next track when current track ends
   */
  const playNextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue((prevQueue) => prevQueue.slice(1));
      checkNextTrack(nextTrack);
    } else if (activeSonglist && songlistIndex < activeSonglist.length - 1) {
      const nextTrack = activeSonglist[songlistIndex + 1];
      setSonglistIndex((prevIndex) => prevIndex + 1);
      play(nextTrack);
    } else {
      pause();
    }
  };

  /**
   * Starts playing a songlist from a specific index
   * @param {Array} songlist - Array of track objects
   * @param {number} [index=0] - Index of track to start playing
   */
  const startSonglist = (songlist, index = 0) => {
    if (!songlist || songlist.length === 0) return;
    setActiveSonglist(songlist);
    setSonglistIndex(index);
    play(songlist[index]);
  };

  /**
   * Adds a track to end of queue.
   * @param {Object} track - Track to add to queue
   */
  const addToQueue = (track) => {
    setQueue((prevQueue) => [...prevQueue, track]);
  };

  /**
   * Removes a track from queue at specified index
   * @param {number} index - Index of track to remove
   */
  const removeFromQueue = (index) => {
    setQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      newQueue.splice(index, 1);
      return newQueue;
    });
  };

  /**
   * Clears the entire queue
   */
  const clearQueue = () => {
    setQueue([]);
  };

  /**
   * Sets player volume
   * @param {number} newVolume - Volume level (0-100)
   */
  const setPlayerVolume = (newVolume) => {
    if (newVolume >= 0 && newVolume <= 100) {
      setVolume(newVolume);
    }
  };

  /**
   * Toggles muted state
   */
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  /**
   * Updates current playback time and duration
   * @param {number} time - Current time in seconds
   * @param {number} dur - Duration in seconds
   */
  const updateTime = (time, dur) => {
    setCurrentTime(time);
    if (dur && !isNaN(dur)) setDuration(dur);
  };

  /**
   * Context value object containing all externally accessible player state and methods
   * @type {Object}
   */
  const value = {
    isPlaying,
    currentTrack,
    queue,
    volume,
    isMuted,
    currentTime,
    duration,
    play,
    pause,
    skipNext,
    skipPrev,
    playNextTrack,
    startSonglist,
    addToQueue,
    removeFromQueue,
    clearQueue,
    setPlayerVolume,
    toggleMute,
    updateTime,
    seekTo: seekToFn,
    setSeekToFn,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
