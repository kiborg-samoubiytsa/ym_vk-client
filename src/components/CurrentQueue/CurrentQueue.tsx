import { FC } from "react";
import "./CurrentQueue.scss";
import { useSelector } from "react-redux";
import {
  currentQueue as queue,
  queueType as type,
} from "../../store/reducers/currentQueueSlice";
import { AlbumWithTracks, IPlaylist } from "../../types/types";
import { QueueInfo } from "./QueueInfo";
import { PlaylistQueue } from "./PlaylistQueue";
import { AlbumQueue } from "./AlbumQueue";

interface Props {
  setIsQueueDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentQueuePage: FC<Props> = ({ setIsQueueDisplayed }) => {
  const currentQueue = useSelector(queue);
  const queueType = useSelector(type);
  return (
    <div className={"currentQueue"}>
      <QueueInfo
        queueInfo={currentQueue}
        setIsQueueDisplayed={setIsQueueDisplayed}
      />
      <div className="playlist">
        {queueType == "playlist" ? (
          <PlaylistQueue currentQueue={currentQueue as Required<IPlaylist>} />
        ) : queueType == "album" ? (
          <AlbumQueue currentQueue={currentQueue as AlbumWithTracks} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CurrentQueuePage;
