import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import {
  fetchFavoriteTracks,
  favoriteTrackIds,
} from "../../store/reducers/favoriteTracksSlice";
import { AppDispatch } from "../../store/store";
import { IPlaylist } from "../../types/types";
import { PlaylistCover } from "../Playlist/PlaylistCover";
import styles from "./UserCollection.module.scss";

export const UserPlaylists: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteTracks = useSelector(favoriteTrackIds);
  const sessionStoragePlaylists = sessionStorage.getItem("user-playlists")
    ? JSON.parse(sessionStorage.getItem("user-playlists") || "")
    : [];
  const userData = JSON.parse(localStorage.getItem("user-data") || "");
  const { data, error } = useFetch<IPlaylist[]>(
    `http://localhost:3002/user-playlists/username=${userData.username}/password=${userData.password}`
  );
  useEffect(() => {
    if (
      (sessionStoragePlaylists.length == 0 || !sessionStoragePlaylists) &&
      data
    ) {
      sessionStorage.setItem("user-playlists", JSON.stringify(data));
    }
    console.log(data);
  }, []);
  useEffect(() => {
    if (favoriteTracks.length == 0) {
      dispatch(fetchFavoriteTracks());
    }
  }, []);

  return (
    <>
      <div className={styles.userCollection}>
        {!error ? (
          sessionStoragePlaylists.length > 0 ? (
            sessionStoragePlaylists?.map(
              (playlist: IPlaylist, index: number) => (
                <PlaylistCover key={index} playlistInfo={playlist} />
              )
            )
          ) : (
            data?.map((playlist, index) => (
              <PlaylistCover key={index} playlistInfo={playlist} />
            ))
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
