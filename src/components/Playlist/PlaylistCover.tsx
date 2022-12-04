import { FC } from "react";
import { IPlaylist } from "../../types/types";
import styles from "../../components/CollectionItemCover.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  fetchPlaylist,
  setIsSelected,
  status as playlistStatus,
  selectedCollection as source,
} from "../../store/reducers/selectedPlaylistSlice";
import { CoverPlayButton } from "../CoverPlayButton";

interface Props {
  playlistInfo: IPlaylist | undefined;
}

export const PlaylistCover: FC<Props> = ({ playlistInfo }) => {
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
      dispatch(setIsSelected(true));
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
              src={`https://${playlistInfo?.ogImage.replace("%%", "200x200")}`}
              alt="cover"
            ></img>
          )}
        </>
      </div>
      <div className={styles.title}>{playlistInfo?.title}</div>
    </div>
  );
};
