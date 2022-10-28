import { FC } from "react";
import PlayButton from "./PlayButton";
import Title from "./Title";
import { IArtist, IPlaylist } from "../types/types";
import Artist from "./Playlist/Artist";
import Duration from "./Playlist/Duration";
import { Cover } from "./Cover";
import { useSelector } from "react-redux";
import {
  isTrackPlaying as isPlaying,
  trackId,
} from "../store/reducers/currentTrackSlice";

interface Props {
  id: string;
  title: string;
  index: number;
  artists: IArtist[];
  duration: number;
  styles: any;
  playlist?: IPlaylist;
  trackCover?: string;
}

const Track: FC<Props> = ({
  title,
  index,
  artists,
  duration,
  styles,
  playlist,
  id,
  trackCover,
}) => {
  const isTrackPlaying = useSelector(isPlaying);
  const currentTrackId = useSelector(trackId);
  return (
    <div className={styles.track}>
      <PlayButton
        index={index}
        styles={styles}
        playlistInfo={playlist}
        id={id}
      />
      {isTrackPlaying && id == currentTrackId ? (
        <> </>
      ) : (
        <span className={styles.index}>{index + 1}</span>
      )}
      {trackCover ? <Cover imageUrl={trackCover} styles={styles} /> : <></>}
      <Title title={title} styles={styles}></Title>
      <Artist artists={artists} styles={styles}></Artist>
      <Duration duration={duration} styles={styles}></Duration>
    </div>
  );
};

export default Track;
