import { FC } from "react";
import styles from "./CurrentQueue.module.scss";
import Track from "../Track";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { currentQueue } from "../../store/reducers/currentQueueSlice";
import { PlaylistTrack } from "../../types/types";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";

interface Props {
  setIsQueueDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentQueuePage: FC<Props> = ({ setIsQueueDisplayed }) => {
  const playlist = useSelector(currentQueue);
  const artists = playlist.tracks!.map((track: PlaylistTrack) => {
    return track.track.artists;
  });
  const images = playlist.tracks!.map((track: PlaylistTrack) => {
    return `https://${track.track.ogImage!.replace("%%", "50x50")}`;
  });
  return (
    <div className={styles.currentQueue}>
      <div className={styles.infoContainer}>
        <div className={styles.closeButton}>
          <IconContext.Provider value={{ size: "23" }}>
            <AiOutlineClose onClick={() => setIsQueueDisplayed(false)} />
          </IconContext.Provider>
        </div>
        <span className={styles.playlistInfo}>
          <span className={styles.defaultText}>Сейчас играет: </span>
          {playlist.kind == 3 ? "Мне нравится" : playlist.title}
        </span>
      </div>
      <div className={styles.playlist}>
        <div className={styles.tracks}>
          {playlist.tracks!.map((track: any, index: number) =>
            !track.track.error ? (
              <Track
                title={track.track.title}
                id={track.track.id}
                trackCover={images[index]}
                playlist={playlist}
                index={index}
                key={index}
                artists={artists[index]}
                duration={track.track.durationMs}
                styles={styles}
              ></Track>
            ) : (
              <div key={index}></div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentQueuePage;
