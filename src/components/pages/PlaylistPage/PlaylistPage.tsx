import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { setSelectedCollectionType } from "../../../store/reducers/selectedItemSlice";
import { IPlaylist } from "../../../types/types";
import { Sidebar } from "../../Sidebar/Sidebar";
import Track from "../../Track/Track";
import trackStyles from "../../Track/PageTrack.module.scss";
import styles from "../../CollectionCovers/CollectionCover.module.scss";
import { covers } from "../../../img/coverStocks/allDefaultCovers";
import "./PlaylistPage.scss";
import {
  favoriteTrackIds,
  fetchFavoriteTracks,
} from "../../../store/reducers/favoriteTracksSlice";
import { AppDispatch } from "../../../store/store";

export const PlaylistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const splittedUrl = location.pathname.split("/");
  const userId = splittedUrl[2];
  const playlistKind = splittedUrl[4];
  const favoriteTracks = useSelector(favoriteTrackIds);
  const {
    data: collection,
    error,
    state,
  } = useFetch<IPlaylist>(
    `http://localhost:3002/playlists/info/user=${userId}/kind=${playlistKind}/`
  );
  useEffect(() => {
    if (favoriteTracks.length == 0) {
      dispatch(fetchFavoriteTracks());
    }
    dispatch(setSelectedCollectionType("playlist"));
  }, []);
  return (
    <div className="User-Collection">
      <div className="content">
        <div className="playlistSupplement">
          {collection?.cover.itemsUri?.length &&
          collection.cover.type == "mosaic" ? (
            collection?.cover.itemsUri?.length >= 4 ? (
              <div className={styles.coverGrid}>
                {collection?.cover.itemsUri?.map((item, index) => (
                  <img
                    key={index}
                    src={`https://${item.replace("%%", "100x100")}`}
                    alt="cover"
                  />
                ))}
              </div>
            ) : (
              <img
                src={`https://${collection?.cover.itemsUri[0].replace(
                  "%%",
                  "200x200"
                )}`}
                alt="cover"
              ></img>
            )
          ) : collection?.cover.uri ? (
            <img
              src={`https://${collection?.cover.uri.replace("%%", "200x200")}`}
              alt="cover"
            ></img>
          ) : (
            <img src={covers[Math.floor(Math.random() * 4)]} alt="cover"></img>
          )}
          <div className="playlistInfo">
            <span className="defaultText">ПЛЕЙЛИСТ</span>
            <span className="playlistTitle">
              {collection?.kind == 3 ? "Мне нравится" : collection?.title}
            </span>
            <span className="ownerName">{collection?.owner.name}</span>
          </div>
        </div>
        {collection ? (
          collection.tracks!.map((track, index) =>
            track.track.availableForPremiumUsers ? (
              <Track
                id={track.id}
                title={track.track.title}
                index={index}
                duration={track.track.durationMs}
                artists={track.track.artists}
                albumId={track.track.albums[0].id}
                collection={collection as IPlaylist}
                styles={trackStyles}
                trackCover={`https://${track.track.ogImage?.replace(
                  "%%",
                  "50x50"
                )}`}
              />
            ) : (
              <></>
            )
          )
        ) : (
          <></>
        )}
      </div>
      <Sidebar />
    </div>
  );
};
