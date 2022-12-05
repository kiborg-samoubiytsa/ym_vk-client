import { FC } from "react";
import { Album } from "../../types/types";
import styles from "./CollectionCover.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  status as loadingStatus,
  selectedCollection,
  fetchAlbum,
  setIsSelected,
} from "../../store/reducers/selectedCollectionSlice";
import { AppDispatch } from "../../store/store";
import { CoverPlayButton } from "../CoverPlayButton";

interface Props {
  albumInfo: Album;
}

export const AlbumCover: FC<Props> = ({ albumInfo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const collectionStatus = useSelector(loadingStatus);
  const selectedAlbum = useSelector(selectedCollection);
  const selectAlbum = () => {
    if (
      ((selectedAlbum as Album).id != albumInfo.id &&
        collectionStatus == "succeeded") ||
      collectionStatus == "idle"
    ) {
      dispatch(fetchAlbum({ albumId: albumInfo.id }));
      dispatch(setIsSelected(true));
    }
  };

  return (
    <div
      className={styles.coverContainer}
      onClick={() => {
        selectAlbum();
      }}
    >
      {
        <div className={styles.cover}>
          <CoverPlayButton styles={styles} albumInfo={albumInfo} />
          <img
            src={`https://${albumInfo.coverUri.replace("%%", "200x200")}`}
            alt="cover"
          />
        </div>
      }
      <div className={styles.title}>{albumInfo?.title}</div>
    </div>
  );
};
