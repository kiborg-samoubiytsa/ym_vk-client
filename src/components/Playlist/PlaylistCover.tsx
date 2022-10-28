import { FC, useState } from "react";
import { IPlaylist } from "../../types/types";
import styles from "./PlaylistCover.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchPlaylist,
  setIsPlaylistSelected,
  playlistStatus as loadingStatus,
  selectedPlaylist as source,
} from "../../store/reducers/selectedPlaylistSlice";

interface Props {
  playlistInfo: IPlaylist | undefined;
}

export const PlaylistCover: FC<Props> = ({ playlistInfo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(loadingStatus);
  const selectedPlaylist = useSelector(source);
  const handlePlaylistSelect = () => {
    if (
      (status == "succeeded" &&
        playlistInfo!.playlistUuid != selectedPlaylist!.playlistUuid) ||
      status == "idle"
    ) {
      dispatch(
        fetchPlaylist({
          user: playlistInfo?.owner.login,
          kind: playlistInfo?.kind,
        })
      );
      dispatch(setIsPlaylistSelected(true));
    }
    return;
  };

  return (
    <div className={styles.userPlaylistCover} onClick={handlePlaylistSelect}>
      {playlistInfo?.cover.itemsUri?.length &&
      playlistInfo.cover.type == "mosaic" ? (
        playlistInfo?.cover.itemsUri?.length >= 4 ? (
          <div className={styles.playlistCover}>
            <div className={styles.coverGrid}>
              {playlistInfo?.cover.itemsUri?.map((item, index) => (
                <img
                  key={index}
                  src={`https://${item.replace("%%", "100x100")}`}
                  alt="cover"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.playlistCover}>
            <img
              src={`https://${playlistInfo?.cover.itemsUri[0].replace(
                "%%",
                "200x200"
              )}`}
              alt="cover"
            ></img>
          </div>
        )
      ) : playlistInfo?.cover.uri ? (
        <div className={styles.playlistCover}>
          <img
            src={`https://${playlistInfo?.cover.uri.replace("%%", "200x200")}`}
            alt="cover"
          ></img>
        </div>
      ) : (
        <div className={styles.playlistCover}>
          <img
            src={`https://${playlistInfo?.ogImage.replace("%%", "200x200")}`}
            alt="cover"
          ></img>
        </div>
      )}
      <div className={styles.playlistTitle}>{playlistInfo?.title}</div>
    </div>
  );
};
