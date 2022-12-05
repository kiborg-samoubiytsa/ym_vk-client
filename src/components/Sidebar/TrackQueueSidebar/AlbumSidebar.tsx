import { FC, useEffect } from "react";
import { AlbumWithTracks } from "../../../types/types";
import styles from "./Sidebar.module.scss";
import Track from "../../Track/Track";
import { concatArtistNames } from "../../../helpers/concatArtistNames";
import CloseButton from "./CloseButton";

interface Props {
  album: AlbumWithTracks;
}

export const AlbumSidebar: FC<Props> = ({ album }) => {
  const volumes = album.volumes;

  useEffect(() => {
    console.log(1);
  }, []);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.playlist}>
        <span className={styles.playlistTitle}>{album.title}</span>
        <div className={styles.playlistOwner}>
          <span className={styles.defaultText}>Исполнитель: </span>
          {concatArtistNames(album.artists)}
        </div>
      </div>
      {volumes.map((volume, i) => (
        <div className={styles.tracks} key={i}>
          {volume.map((track, index) =>
            track.availableForPremiumUsers ? ( //displays track only if its available
              <Track
                title={track.title}
                id={track.id}
                index={index}
                key={index}
                duration={track.durationMs}
                styles={styles}
                collection={album}
                albumId={album.id}
              ></Track>
            ) : (
              <div key={index}></div>
            )
          )}
        </div>
      ))}
      <CloseButton styles={styles} />
    </div>
  );
};
