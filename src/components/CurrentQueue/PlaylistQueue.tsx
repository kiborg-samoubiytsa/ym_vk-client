import { FC } from "react";
import { IPlaylist, PlaylistTrack } from "../../types/types";
import Track from "../Track/Track";

interface Props {
  currentQueue: Required<IPlaylist>;
  styles: any;
}

export const PlaylistQueue: FC<Props> = ({ currentQueue, styles }) => {
  return (
    <div className={styles.tracks}>
      {currentQueue.tracks.map((track: PlaylistTrack, index: number) =>
        track.track.availableForPremiumUsers ? (
          <Track
            title={track.track.title}
            id={track.track.id}
            trackCover={`https://${track.track.ogImage!.replace(
              "%%",
              "50x50"
            )}`}
            collection={currentQueue}
            index={index}
            key={index}
            artists={track.track.artists}
            duration={track.track.durationMs}
            styles={styles}
            albumId={track.track.albums[0].id}
          ></Track>
        ) : (
          <div key={index}></div>
        )
      )}
    </div>
  );
};
