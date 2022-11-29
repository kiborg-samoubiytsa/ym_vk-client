import { FC, useEffect } from "react";
import { IPlaylist, PlaylistTrack } from "../../types/types";
import Track from "../Track/Track";
import styles from "./Sidebar.module.scss";
import CloseButton from "./CloseButton";

interface Props {
  playlist: IPlaylist;
}

export const PlaylistSidebar: FC<Props> = ({ playlist }) => {
  const artists =
    playlist.tracks?.map((track: PlaylistTrack) => {
      return track.track.artists;
    }) || [];
  const tracks = playlist.tracks;

  useEffect(() => {
    console.log(2);
  }, []);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.playlist}>
        <span className={styles.playlistTitle}>
          {
            playlist.kind != 3
              ? playlist.title
              : "Мне нравится" /* kind 3 is user's favourites*/
          }
        </span>
        <div className={styles.playlistOwner}>
          <span className={styles.defaultText}>Автор: </span>
          {playlist.owner.name}
        </div>
      </div>
      <div className={styles.tracks}>
        {tracks!.map((track: PlaylistTrack, index: number) =>
          track.track.availableForPremiumUsers ? ( //displays track only if its available
            <Track
              title={track.track.title}
              id={track.track.id}
              collection={playlist}
              index={index}
              key={index}
              artists={artists[index]}
              duration={track.track.durationMs}
              styles={styles}
              albumId={track.track.albums[0].id}
            ></Track>
          ) : (
            <div key={index}></div>
          )
        )}
      </div>
      <CloseButton styles={styles} />
    </div>
  );
};
