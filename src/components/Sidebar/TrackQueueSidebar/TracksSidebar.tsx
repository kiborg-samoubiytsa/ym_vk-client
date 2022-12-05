import { FC } from "react";
import { AlbumWithTracks, IPlaylist } from "../../../types/types";
import { useSelector } from "react-redux";
import {
  status as loadingStatus,
  selectedCollection,
  isSelected,
  collectionType as type,
} from "../../../store/reducers/selectedCollectionSlice";
import { favoriteTrackStatus } from "../../../store/reducers/favoriteTracksSlice";
import styles from "./Sidebar.module.scss";
import { PlaylistSidebar } from "./PlaylistSidebar";
import { AlbumSidebar } from "./AlbumSidebar";

export const TracksSidebar: FC = () => {
  const collectionLoadingStatus = useSelector(loadingStatus);
  const source = useSelector(selectedCollection);
  const collectionType = useSelector(type);
  const isPlaylistSelected = useSelector(isSelected);
  const favoriteLoadingStatus = useSelector(favoriteTrackStatus);

  return (
    <>
      {isPlaylistSelected &&
      collectionLoadingStatus == "succeeded" &&
      favoriteLoadingStatus == "succeeded" ? (
        collectionType == "playlist" ? (
          <PlaylistSidebar playlist={source as IPlaylist} />
        ) : collectionType == "album" ? (
          <AlbumSidebar album={source as AlbumWithTracks} />
        ) : (
          <div className={styles.infoContainer}></div>
        )
      ) : (
        <div className={styles.infoContainer}></div>
      )}
    </>
  );
};
