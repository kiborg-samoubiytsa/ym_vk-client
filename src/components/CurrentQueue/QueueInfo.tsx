import { FC } from "react";
import { AlbumWithTracks, IPlaylist } from "../../types/types";
import { useSelector } from "react-redux";
import { queueType as type } from "../../store/reducers/currentQueueSlice";
import { CloseButton } from "./QueueCloseButton";
interface Props {
  styles: any;
  queueInfo: AlbumWithTracks | IPlaylist;
  setIsQueueDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}
export const QueueInfo: FC<Props> = ({
  styles,
  queueInfo,
  setIsQueueDisplayed,
}) => {
  const queueType = useSelector(type);
  return (
    <div>
      <div className={styles.infoContainer}>
        <CloseButton
          styles={styles}
          setIsQueueDisplayed={setIsQueueDisplayed}
        />
        <span className={styles.playingQueueInfo}>
          <>
            <span className={styles.defaultText}>Сейчас играет: </span>
            {queueType == "playlist" ? (
              (queueInfo as IPlaylist).kind == 3 ? (
                "Мне нравится"
              ) : (
                queueInfo.title
              )
            ) : queueType == "album" ? (
              queueInfo.title
            ) : (
              <></>
            )}
          </>
        </span>
      </div>
    </div>
  );
};
