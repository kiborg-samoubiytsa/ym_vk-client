import { FC } from "react";
import { AlbumWithTracks, IPlaylist } from "../../types/types";
import { useSelector } from "react-redux";
import { queueType as type } from "../../store/reducers/currentQueueSlice";
import { CloseButton } from "./QueueCloseButton";
interface Props {
  queueInfo: AlbumWithTracks | IPlaylist;
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
