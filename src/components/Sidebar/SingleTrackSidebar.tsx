import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { concatArtistNames } from "../../helpers/concatArtistNames";
import {
  selectedCollection,
  status,
} from "../../store/reducers/selectedItemSlice";
import { FullTrackInfo } from "../../types/types";
import "./Sidebar.scss";
import Track from "../Track/Track";
import trackStyles from "../Track/SidebarTrack.module.scss";

export const SingleTrackSidebar = () => {
  const dispatch = useDispatch();
  const trackLoadingStatus = useSelector(status);
  const trackInfo = useSelector(selectedCollection) as FullTrackInfo;
  //web-own_playlists-playlist-similar_track-fridge
  return (
    <>
      {trackLoadingStatus == "succeeded" ? (
        <div className="playlist">
          <span className="defaultText">ТРЕК</span>
          <div className="sidebar_collectionTitle">
            {trackInfo.similar.track.title}
          </div>
          <div className="sidebar_collectionOwner">
            {concatArtistNames(trackInfo.similar.track.artists)}
          </div>
          <div className="sidebar_tracks">
            <div className="defaultText">ПОХОЖИЕ ТРЕКИ</div>
            {trackInfo.similar.similarTracks.map((track, index) =>
              track.availableForPremiumUsers ? (
                <Track
                  title={track.title}
                  id={track.id}
                  index={index}
                  key={index}
                  duration={track.durationMs}
                  styles={trackStyles}
                  albumId={track.albums[0].id}
                  collection={trackInfo.similar}
                ></Track>
              ) : (
                <div key={index}></div>
              )
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
