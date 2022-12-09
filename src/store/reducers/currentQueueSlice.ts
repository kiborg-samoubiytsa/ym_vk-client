import { createSlice } from "@reduxjs/toolkit";
import { AlbumWithTracks, IPlaylist } from "../../types/types";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";

interface tracksState {
  status: "idle" | "loading" | "succeeded" | "failed";
  tracksUrl: string[];
  currentQueue: IPlaylist | AlbumWithTracks;
  isDisplayed: boolean;
  error: string | undefined;
  type: "playlist" | "album" | "not-selected";
}

const initialState: tracksState = {
  status: "idle",
  tracksUrl: [],
  currentQueue: {} as Required<IPlaylist> | AlbumWithTracks,
  error: undefined,
  isDisplayed: false,
  type: "not-selected",
};

const queueSlice = createSlice({
  name: "currentQueue",
  initialState,
  reducers: {
    setCurrentQueue(state, action: PayloadAction<IPlaylist | AlbumWithTracks>) {
      state.currentQueue = action.payload;
    },
    setQueueType(state, action: PayloadAction<tracksState["type"]>) {
      state.type = action.payload;
    },
  },
});
export const { setCurrentQueue, setQueueType } = queueSlice.actions;
export const currentQueue = (state: RootState) =>
  state.currentQueueSlice.currentQueue;
export const status = (state: RootState) => state.currentQueueSlice.status;
export const isVisible = (state: RootState) =>
  state.currentQueueSlice.isDisplayed;
export const queueType = (state: RootState) => state.currentQueueSlice.type;
export const currentQueueSlice = queueSlice.reducer;
