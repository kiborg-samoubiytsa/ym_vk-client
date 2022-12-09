import { FC, useEffect } from "react";
import { AiOutlinePause } from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  setIsRadioMode,
  setPlayerVisible,
} from "../../store/reducers/playerSlice";
import {
  setIsPlaying,
  setIndex,
  trackId,
  isTrackPlaying as isPlaying,
} from "../../store/reducers/currentTrackSlice";
import { AlbumWithTracks, IPlaylist } from "../../types/types";
import {
  currentQueue,
  isVisible,
  queueType,
  setCurrentQueue,
  setQueueType,
} from "../../store/reducers/currentQueueSlice";
import { collectionType as selectedCollectionType } from "../../store/reducers/selectedItemSlice";

interface Props {
  collectionInfo?: IPlaylist | AlbumWithTracks;
  index: number;
  styles: any;
  id: string | number;
}

const PlayButton: FC<Props> = ({ index, styles, collectionInfo, id }) => {
  //useDispatch
  const dispatch = useDispatch<AppDispatch>();
  //useSelectors
  const source = useSelector(currentQueue);
  const sourceType = useSelector(queueType);
  const currentTrackId = useSelector(trackId);
  const collectionType = useSelector(selectedCollectionType);

  const isPlayerVisible = useSelector(isVisible);
  const isTrackPlaying = useSelector(isPlaying);

  const handlePlay = () => {
    //если выбран альбом, а играет трек из плейлиста и нажимается кнопка в текущей очереди, то пиздец
    //TODO пофиксить это
    if (!isPlayerVisible) {
      dispatch(setPlayerVisible(true));
    }
    if (currentTrackId != id) {
      dispatch(setIndex(index));
      dispatch(setIsRadioMode(false));
      dispatch(setIsPlaying(true));
    }
    if (
      sourceType != collectionType &&
      collectionType == "album" &&
      currentTrackId != id
    ) {
      dispatch(setCurrentQueue(collectionInfo as AlbumWithTracks));
      dispatch(setQueueType("album"));
    }
    if (
      sourceType == collectionType &&
      collectionType == "album" &&
      (collectionInfo as AlbumWithTracks).id != (source as AlbumWithTracks).id
    ) {
      dispatch(setCurrentQueue(collectionInfo as AlbumWithTracks));
      dispatch(setQueueType("album"));
    }
    if (
      sourceType == collectionType &&
      collectionType == "playlist" &&
      (collectionInfo as IPlaylist).playlistUuid !=
        (source as IPlaylist).playlistUuid
    ) {
      dispatch(setCurrentQueue(collectionInfo as IPlaylist));
      dispatch(setQueueType("playlist"));
    }
    if (
      sourceType != collectionType &&
      collectionType == "playlist" &&
      currentTrackId != id
    ) {
      dispatch(setCurrentQueue(collectionInfo as IPlaylist));
      dispatch(setQueueType("playlist"));
    }
    if (
      collectionType == "playlist" &&
      collectionInfo?.trackCount != source.trackCount
    ) {
      dispatch(setCurrentQueue(collectionInfo as IPlaylist));
      dispatch(setQueueType("playlist"));
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
