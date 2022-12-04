import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIndex, setIsPlaying } from "../store/reducers/currentTrackSlice";
import {
  setCurrentQueue,
  setQueueType,
} from "../store/reducers/currentQueueSlice";
import { Album, IPlaylist } from "../types/types";
import { getQueueFromCollection } from "../requests/getTrackFromCollection";
import { BiPlay } from "react-icons/bi";
import { IconContext } from "react-icons";
import {
  isPlayerVisible as isVisible,
  setPlayerVisible,
} from "../store/reducers/playerSlice";

interface Props {
  playlistInfo?: IPlaylist;
  albumInfo?: Album;
  styles: any;
}

export const CoverPlayButton: FC<Props> = ({
  playlistInfo,
  albumInfo,
  styles,
}) => {
  const dispatch = useDispatch();
  const isPlayerVisible = useSelector(isVisible);
  const handlePlaylistPlayStart = async () => {
    if (!isPlayerVisible) {
      dispatch(setPlayerVisible(true));
    }
    if (playlistInfo) {
      const trackQueue = await getQueueFromCollection("playlist", playlistInfo);
      dispatch(setQueueType("playlist"));
      dispatch(setCurrentQueue(trackQueue));
      dispatch(setIndex(0));
    }
    if (albumInfo) {
      const trackQueue = await getQueueFromCollection("album", albumInfo);
      console.log(trackQueue);
      dispatch(setQueueType("album"));
      dispatch(setCurrentQueue(trackQueue));
      dispatch(setIndex(0));
      dispatch(setIsPlaying(true));
    }
  };
  return (
    <div className={styles.coverPlayButtonContainer}>
      <IconContext.Provider value={{ size: "24px" }}>
        <BiPlay
          onClick={handlePlaylistPlayStart}
          className={styles.coverPlayButton}
        />
      </IconContext.Provider>
    </div>
  );
};
