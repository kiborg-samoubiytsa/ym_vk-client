import { FC } from "react";
import { IPlaylist } from "../../types/types";
import styles from "./CollectionCover.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  fetchPlaylist,
  setIsCollectionSelected,
  status as playlistStatus,
  selectedCollection as source,
  setIsTrackSelected,
  setItemMetadata,
} from "../../store/reducers/selectedItemSlice";
import { CoverPlayButton } from "./CoverPlayButton";
import { Link } from "react-router-dom";
import { covers } from "../../img/coverStocks/allDefaultCovers";

interface Props {
  playlistInfo: IPlaylist | undefined;
  metadata: string;
}

export const PlaylistCover: FC<Props> = ({ playlistInfo, metadata }) => {
  const dispatch = useDispatch<AppDispatch>();
  const collectionStatus = useSelector(playlistStatus);
  const selectedPlaylist = useSelector(source);
  const handlePlaylistSelect = () => {
    if (
      (collectionStatus == "succeeded" &&
        playlistInfo!.playlistUuid !=
          (selectedPlaylist as IPlaylist).playlistUuid) ||
      collectionStatus == "idle"
    ) {
      dispatch(
        fetchPlaylist({
          user: playlistInfo?.owner.login,
          kind: playlistInfo?.kind,
        })
      );
      dispatch(setIsTrackSelected(false));
      dispatch(setIsCollectionSelected(true));
      dispatch(setItemMetadata(metadata));
    }
    return;
  };

  return (
    <div className={styles.coverContainer} onClick={handlePlaylistSelect}>
      <div className={styles.cover}>
        <>
          <CoverPlayButton playlistInfo={playlistInfo} styles={styles} />
          {playlistInfo?.cover.itemsUri?.length &&
          playlistInfo.cover.type == "mosaic" ? (
            playlistInfo?.cover.itemsUri?.length >= 4 ? (
              <div className={styles.coverGrid}>
                {playlistInfo?.cover.itemsUri?.map((item, index) => (
                  <img
                    key={index}
                    src={`https://${item.replace("%%", "100x100")}`}
                    alt="cover"
                  />
                ))}
              </div>
            ) : (
              <img
                src={`https://${playlistInfo?.cover.itemsUri[0].replace(
                  "%%",
                  "200x200"
                )}`}
                alt="cover"
              ></img>
            )
          ) : playlistInfo?.cover.uri ? (
            <img
              src={`https://${playlistInfo?.cover.uri.replace(
                "%%",
                "200x200"
              )}`}
              alt="cover"
            ></img>
          ) : (
            <img
              src={covers[Math.floor(Math.random() * covers.length)]}
              alt="cover"
            ></img>
          )}
        </>
      </div>
      <Link
        className={styles.title}
        to={`/users/${playlistInfo?.owner.uid}/playlists/${playlistInfo?.kind}`}
      >
        {playlistInfo?.title}
      </Link>
    </div>
  );
};
