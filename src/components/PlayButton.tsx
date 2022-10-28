import { FC } from "react";
import { AiOutlinePause } from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  setIsRadioMode,
  setPlayerVisible,
} from "../store/reducers/playerSlice";
import {
  setIsPlaying,
  setIndex,
  trackId,
  isTrackPlaying as isPlaying,
} from "../store/reducers/currentTrackSlice";
import { IPlaylist } from "../types/types";
import {
  currentQueue,
  isVisible,
  setCurrentQueue,
} from "../store/reducers/currentQueueSlice";
import { emptyPlaylist } from "../emptyPlaylist";

interface Props {
  playlistInfo?: IPlaylist;
  index: number;
  styles: any;
  id: string;
}

const PlayButton: FC<Props> = ({ index, styles, playlistInfo, id }) => {
  //useDispatch
  const dispatch = useDispatch<AppDispatch>();
  //useSelectors
  const sourcePlaylist = useSelector(currentQueue);
  const currentTrackId = useSelector(trackId);

  const isPlayerVisible = useSelector(isVisible);
  const isTrackPlaying = useSelector(isPlaying);

  const handlePlay = () => {
    if (!isPlayerVisible) {
      dispatch(setPlayerVisible(true));
    }
    if (currentTrackId != id) {
      dispatch(setIndex(index));
      dispatch(setIsRadioMode(false));
      dispatch(setIsPlaying(true));
    }
    if (sourcePlaylist.kind != playlistInfo!.kind && currentTrackId != id) {
      dispatch(setCurrentQueue(playlistInfo || emptyPlaylist));
    } else {
      dispatch(setIsPlaying(true));
    }
  };
  const handleStop = () => {
    dispatch(setIsPlaying(false));
  };

  return (
    <div className={styles.controlButtonContainer}>
      <IconContext.Provider value={{ size: "24px" }}>
        {id != currentTrackId || (id == currentTrackId && !isTrackPlaying) ? (
          <BiPlay onClick={handlePlay} className={styles.playButton} />
        ) : (
          <div>
            <AiOutlinePause
              onClick={handleStop}
              className={styles.pauseButton}
            />
            <div className={styles.playingTrackAnimationContainer}>
              <div className={styles.playingTrackAnimation}></div>
            </div>
          </div>
        )}
      </IconContext.Provider>
    </div>
  );
};

export default PlayButton;
