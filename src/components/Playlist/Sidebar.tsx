import { FC } from "react";
import Track from "../Track";
import { PlaylistTrack } from "../../types/types";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setIsPlaylistSelected } from "../../store/reducers/selectedPlaylistSlice";
import { IconContext } from "react-icons";
import {
  playlistStatus,
  selectedPlaylist,
  isSelected,
} from "../../store/reducers/selectedPlaylistSlice";

interface Props {
  styles: any;
}

export const SideBar: FC<Props> = ({ styles }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loadingStatus = useSelector(playlistStatus);
  const source = useSelector(selectedPlaylist);
  const isPlaylistSelected = useSelector(isSelected);
  const artists =
    source.tracks?.map((track: PlaylistTrack) => {
      return track.track.artists;
    }) || [];
  const tracks = source.tracks;
  return (
    <>
      {isPlaylistSelected && loadingStatus == "succeeded" ? (
        <div className={styles.sidebarTracks}>
          <div className={styles.source}>
            <span className={styles.playlistTitle}>
              {
                source.kind != 3
                  ? source.title
                  : "Мне нравится" /* kind 3 is user's favourites*/
              }
            </span>
            <div className={styles.playlistOwner}>
              <span className={styles.defaultText}>Автор: </span>
              {source.owner.name}
            </div>
          </div>
          <div className={styles.tracks}>
            {tracks!.map((track: any, index: number) =>
              track.track.available ? ( //displays track only if its available
                <Track
                  title={track.track.title}
                  id={track.track.id}
                  playlist={source}
                  index={index}
                  key={index}
                  artists={artists[index]}
                  duration={track.track.durationMs}
                  styles={styles}
                ></Track>
              ) : (
                <div key={index}></div>
              )
            )}
          </div>
          <IconContext.Provider value={{ size: "32" }}>
            <AiOutlineClose
              className={styles.closeButton}
              onClick={() => {
                dispatch(setIsPlaylistSelected(false));
              }}
            />
          </IconContext.Provider>
        </div>
      ) : (
        <div className={styles.sidebarTracks}></div>
      )}
    </>
  );
};
