import axios from "axios";
import { Track } from "../types/types";

export const expandCurrentQueue = async (tracks: Array<Track>) => {
  const { data } = await axios.post(
    "http://localhost:3002/expand-current-queue",
    tracks
  );
  return data;
};
