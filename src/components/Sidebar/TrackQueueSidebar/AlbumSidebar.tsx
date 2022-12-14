import { FC, useEffect } from "react";
import { AlbumWithTracks } from "../../../types/types";
import "../Sidebar.scss";
import trackStyles from "../../Track/SidebarTrack.module.scss";
import Track from "../../Track/Track";
import { concatArtistNames } from "../../../helpers/concatArtistNames";
import CloseButton from "../CloseButton";

interface Props {
  album: AlbumWithTracks;
}

export const AlbumSidebar: FC<Props> = ({ album }) => {
  const volumes = album.volumes;

  useEffect(() => {
    console.log(1);
  }, []);

  return (
    <div>
      <div className="playlist">
        <span className="sidebar_collectionTitle">{album.title}</span>
        <div className="sidebar_collectionOwner">
          <span className="defaultText">Исполнитель: </span>
          {concatArtistNames(album.artists)}
        </div>
      </div>
      {volumes.map((volume, i) => (
        <div className="sidebar_tracks" key={i}>
          {volume.map((track, index) =>
            track.availableForPremiumUsers ? ( //displays track only if its available
              <Track
                title={track.title}
                id={track.id}
                index={index}
                key={index}
                duration={track.durationMs}
                styles={trackStyles}
                collection={album}
                albumId={album.id}
              ></Track>
            ) : (
              <div key={index}></div>
            )
          )}
        </div>
      ))}
      <CloseButton />
    </div>
  );
};
