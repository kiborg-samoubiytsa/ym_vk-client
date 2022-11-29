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
  const { data, error } = useFetch<Album[]>(
    `http://localhost:3002/user-albums/username=${userData.username}/password=${userData.password}`
  );
  useEffect(() => {
    if (favoriteTracks.length == 0) {
      dispatch(fetchFavoriteTracks());
    }
  }, []);
  return (
    <div className={styles.userCollection}>
      {!error ? (
        data?.map((album: Album, index) => (
          <AlbumCover key={index} albumInfo={album} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
