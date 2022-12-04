import { AlbumCover } from "../Album/AlbumCover";
import useFetch from "../../hooks/useFetch";
import { FC, useEffect } from "react";
import { Album } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserCollection.module.scss";
import {
  favoriteTrackIds,
  fetchFavoriteTracks,
} from "../../store/reducers/favoriteTracksSlice";
import { AppDispatch } from "../../store/store";

export const UserAlbums: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteTracks = useSelector(favoriteTrackIds);
  const userData = JSON.parse(localStorage.getItem("user-data") || "");
  const sessionStorageAlbums = sessionStorage.getItem("user-albums")
    ? JSON.parse(sessionStorage.getItem("user-albums") || "")
    : [];
  const { data, error } = useFetch<Album[]>(
    `http://localhost:3002/user-albums/username=${userData.username}/password=${userData.password}`
  );
  useEffect(() => {
    if (favoriteTracks.length == 0) {
      dispatch(fetchFavoriteTracks());
    }
  }, []);
  useEffect(() => {
    if (data != sessionStorageAlbums && data) {
      sessionStorage.setItem("user-albums", JSON.stringify(data));
      console.log(data);
    }
  }, [data]);
  return (
    <div className={styles.userCollectionContainer}>
      <span className={styles.collectionInfo}>Альбомы</span>
      <div className={styles.userCollection}>
        {!error ? (
          sessionStorageAlbums.length != 0 ? (
            sessionStorageAlbums.map((album: Album, index: number) =>
              album ? <AlbumCover key={index} albumInfo={album} /> : <></>
            )
          ) : (
            data?.map((album: Album, index) =>
              album ? <AlbumCover key={index} albumInfo={album} /> : <></>
            )
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
