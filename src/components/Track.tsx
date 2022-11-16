import { FC } from "react";
import PlayButton from "./PlayButton";
import Title from "./Title";
import { IArtist, IPlaylist } from "../types/types";
import Artist from "./Playlist/Artist";
import Duration from "./Playlist/Duration";
import { Cover } from "./Cover";
import { LikeButton } from "./LikeButton";
import { useSelector } from "react-redux";
import {
  isTrackPlaying as isPlaying,
  trackId,
} from "../store/reducers/currentTrackSlice";
import { favoriteTrackIds } from "../store/reducers/favoriteTracksSlice";

interface Props {
  id: number;
  albumId: number;
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
  albumId,
  duration,
  styles,
  playlist,
  id,
  trackCover,
}) => {
  const isTrackPlaying = useSelector(isPlaying);
  const currentTrackId = useSelector(trackId);
  const favoriteTracks = useSelector(favoriteTrackIds);
  return (
    <>
      <div className={styles.track}>
        <PlayButton
          index={index}
          styles={styles}
          playlistInfo={playlist}
          id={id}
        />
        {isTrackPlaying && id == parseInt(currentTrackId) ? (
          <> </>
        ) : (
          <span className={styles.index}>{index + 1}</span>
        )}
        {trackCover ? <Cover imageUrl={trackCover} styles={styles} /> : <></>}
        <Title title={title} styles={styles}></Title>
        <Artist artists={artists} styles={styles}></Artist>
        <LikeButton id={id} styles={styles} album={albumId} />
        <Duration duration={duration} styles={styles}></Duration>
      </div>
    </>
  );
};

export default Track;
