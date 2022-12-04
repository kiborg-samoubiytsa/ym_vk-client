import { useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { setIndex } from "../store/reducers/currentTrackSlice";
import { setCurrentQueue } from "../store/reducers/currentQueueSlice";
import useFetch from "../hooks/useFetch";
import { Album, AlbumWithTracks } from "../types/types";
import { getTrackFromCollection } from "../requests/getTrackFromCollection";

interface Props {
  albumInfo: Album;
  styles: any;
}

export const CoverPlayButton: FC = () => {
  const dispatch = useDispatch();

  const handleCollectionPlayStart = async () => {
    getTrackFromCollection("");
  };

  /*   useEffect(() => {
    if (data) {
        dispatch()
    }
  }, [data]) */

  return <div>CoverPlayButton</div>;
};
