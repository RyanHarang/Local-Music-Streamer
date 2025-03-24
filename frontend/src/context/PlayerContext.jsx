import React, { createContext, useState, useEffect, useContext } from "react";

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

  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [shufflePath, setShufflePath] = useState(null);
  const [shufflePathIndex, setShufflePathIndex] = useState(0);

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
   * Determines next track
   * If shuffle is enabled, next track is determined by shuffle path
   * If shuffle is disabled, next track is determined by songlist
   * If no songlist is active, checkListEnd is called
   */
  const findNextTrack = () => {
    if (isShuffle && shufflePath) {
      if (shufflePathIndex < shufflePath.length - 1) {
        const nextTrack = activeSonglist[shufflePath[shufflePathIndex + 1]];
        setSonglistIndex(shufflePath[shufflePathIndex + 1]);
        setShufflePathIndex((prevIndex) => prevIndex + 1);
        checkNextTrack(nextTrack);
      } else {
        checkListEnd();
      }
    } else if (activeSonglist) {
      if (songlistIndex < activeSonglist.length - 1) {
        const nextTrack = activeSonglist[songlistIndex + 1];
        setSonglistIndex((prevIndex) => prevIndex + 1);
        checkNextTrack(nextTrack);
      } else {
        checkListEnd();
      }
    } else {
      checkListEnd();
    }
  };

  /**
   * Determines previous track
   * If shuffle is enabled, previous track is determined by shuffle path
   * If shuffle is disabled, previous track is determined by songlist
   * If repeat is disabled and on first track or there is no songlist, restart is called
   */
  const findPrevTrack = () => {
    if (isShuffle && shufflePath) {
      if (shufflePathIndex > 0) {
        const prevTrack = activeSonglist[shufflePath[shufflePathIndex - 1]];
        setShufflePathIndex((prevIndex) => prevIndex - 1);
        setSonglistIndex(shufflePath[shufflePathIndex - 1]);
        checkNextTrack(prevTrack);
      } else if (isRepeat) {
        const prevTrack = activeSonglist[shufflePath[shufflePath.length - 1]];
        setShufflePathIndex(shufflePath.length - 1);
        setSonglistIndex(shufflePath[shufflePath.length - 1]);
        checkNextTrack(prevTrack);
      } else {
        restart(); //may not be intuitive, perhaps change to use modulo to loop through shuffle path
      }
    } else if (activeSonglist) {
      if (songlistIndex > 0) {
        const prevTrack = activeSonglist[songlistIndex - 1];
        setSonglistIndex((prevIndex) => prevIndex - 1);
        checkNextTrack(prevTrack);
      } else if (isRepeat) {
        const prevTrack = activeSonglist[activeSonglist.length - 1];
        setSonglistIndex(activeSonglist.length - 1);
        checkNextTrack(prevTrack);
      } else {
        restart();
      }
    } else {
      restart();
    }
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
   * Checks intended behavior when end of songlist is reached
   * If repeat is enabled and there is no active songlist, current track is replayed
   * If repeat is enabled and there is an active songlist, next track is played, either from shuffle path or songlist
   * If repeat is disabled, current track is paused
   */
  const checkListEnd = () => {
    if (isRepeat) {
      if (!activeSonglist) {
        replay();
      } else if (isShuffle && shufflePath) {
        const nextTrack = activeSonglist[shufflePath[0]];
        setShufflePathIndex(0);
        setSonglistIndex(shufflePath[0]);
        checkNextTrack(nextTrack);
      } else {
        const nextTrack = activeSonglist[0];
        setSonglistIndex(0);
        checkNextTrack(nextTrack);
      }
    } else {
      pause();
    }
  };

  /**
   * Skips to next track in queue or calls findNextTrack
   */
  const skipNext = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue((prevQueue) => prevQueue.slice(1));
      checkNextTrack(nextTrack);
    } else {
      findNextTrack();
    }
  };

  /**
   * Restarts track if less than 3 seconds in, otherwise calls findPrevTrack
   */
  const skipPrev = () => {
    if (currentTime > 3) {
      restart();
    } else {
      findPrevTrack();
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
    } else {
      findNextTrack();
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

    if (isShuffle) handleShufflePath(index);

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
   * Clears queue
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
   * Toggles repeat state
   */
  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  /**
   * Toggles shuffle state
   */
  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  /**
   * Handles creation of shuffle path
   */
  const handleShufflePath = (index = songlistIndex) => {
    if (!activeSonglist || activeSonglist.length === 0) return;
    if (!isShuffle) {
      setShufflePath(null);
      return;
    } else {
      const totalIndexes = activeSonglist.map((_, i) => i);
      const remainingIndexes = totalIndexes.filter((i) => i !== index);

      for (let i = remainingIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingIndexes[i], remainingIndexes[j]] = [
          remainingIndexes[j],
          remainingIndexes[i],
        ];
      }

      const newShufflePath = [index, ...remainingIndexes];
      setShufflePath(newShufflePath);
    }
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
   * Returns array of upcoming tracks
   * @returns {Array} Array of upcoming tracks
   */
  const getUpcomingSongs = () => {
    if (!activeSonglist || activeSonglist.length === 0) return [];

    if (isShuffle && shufflePath) {
      const nextIndexes = shufflePath.slice(shufflePathIndex + 1);
      return nextIndexes.map((index) => activeSonglist[index]);
    }

    return activeSonglist.slice(songlistIndex + 1);
  };

  useEffect(() => {
    if (!activeSonglist || activeSonglist.length === 0) return;
    if (isShuffle) {
      handleShufflePath();
    } else {
      setShufflePath(null);
    }
  }, [activeSonglist, isShuffle]);

  /**
   * Context value object containing all externally accessible player state and methods
   * @type {Object}
   */
  const value = {
    isPlaying,
    isShuffle,
    isRepeat,
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
    setQueue,
    setPlayerVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
    updateTime,
    seekTo: seekToFn,
    setSeekToFn,
    getUpcomingSongs,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
