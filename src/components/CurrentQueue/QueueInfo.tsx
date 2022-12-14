import { FC } from "react";
import {
  Album,
  AlbumWithTracks,
  IPlaylist,
  SimilarTracks,
} from "../../types/types";
import { useSelector } from "react-redux";
import { queueType as type } from "../../store/reducers/currentQueueSlice";
import { CloseButton } from "./QueueCloseButton";
interface Props {
  queueInfo: AlbumWithTracks | IPlaylist | SimilarTracks;
  setIsQueueDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}
export const QueueInfo: FC<Props> = ({ queueInfo, setIsQueueDisplayed }) => {
  const queueType = useSelector(type);
  return (
    <div>
      <div className="infoContainer">
        <CloseButton setIsQueueDisplayed={setIsQueueDisplayed} />
        <span className="currentQueueInfo">
          <>
            <span className="defaultText">Сейчас играет: </span>
            {queueType == "playlist" ? (
              (queueInfo as IPlaylist).kind == 3 ? (
                "Мне нравится"
              ) : (
                (queueInfo as IPlaylist).title
              )
            ) : queueType == "album" ? (
              (queueInfo as Album).title
            ) : queueType == "similar-tracks" ? (
              `Треки, похожие на (queueInfo as SimilarTracks).track.`
            ) : (
              <></>
            )}
          </>
        </span>
      </div>
    </div>
  );
};
