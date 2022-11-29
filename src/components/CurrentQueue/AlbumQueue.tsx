import { FC } from "react";
import { AlbumWithTracks } from "../../types/types";
import Track from "../Track/Track";
import { Track as ITrack } from "../../types/types";

interface Props {
  currentQueue: AlbumWithTracks;
  styles: any;
}

export const AlbumQueue: FC<Props> = ({ currentQueue, styles }) => {
  return (
    <div className={styles.tracks}>
      {currentQueue.volumes
        .flat()
        .map((track: ITrack, index: number) =>
          track.availableForPremiumUsers ? (
            <Track
              title={track.title}
              id={track.id}
              trackCover={`https://${track.ogImage!.replace("%%", "50x50")}`}
              collection={currentQueue}
              index={index}
              key={index}
              artists={track.artists}
              duration={track.durationMs}
              styles={styles}
              albumId={track.albums[0].id}
            ></Track>
          ) : (
            <div key={index}></div>
          )
        )}
    </div>
  );
};
