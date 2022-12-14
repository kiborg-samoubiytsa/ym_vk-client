import { FC, useEffect } from "react";
import { IPlaylist, PlaylistTrack } from "../../../types/types";
import Track from "../../Track/Track";
import "../Sidebar.scss";
import trackStyles from "../../Track/SidebarTrack.module.scss";
import CloseButton from "../CloseButton";

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
    <div>
      <div className="playlist">
        <span className="sidebar_collectionTitle">
          {
            playlist.kind != 3
              ? playlist.title
              : "Мне нравится" /* kind 3 is user's favourites*/
          }
        </span>
        <div className="sidebar_collectionOwner">
          <span className="defaultText">Автор: </span>
          {playlist.owner.name}
        </div>
      </div>
      <div className="sidebar_tracks">
        {tracks!.map(
          (
            track: PlaylistTrack,
            index: number //displays track only if its available
          ) =>
            track.track.availableForPremiumUsers ? (
              <Track
                title={track.track.title}
                id={track.track.id}
                collection={playlist}
                index={index}
                key={index}
                artists={artists[index]}
                duration={track.track.durationMs}
                styles={trackStyles}
                albumId={track.track.albums[0].id}
              ></Track>
            ) : (
              <div key={index}></div>
            )
        )}
      </div>
      <CloseButton />
    </div>
  );
};
