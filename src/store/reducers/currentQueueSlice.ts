import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPlaylist } from "../../types/types";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { emptyPlaylist } from "../../emptyPlaylist";
import axios from "axios";

interface tracksState {
  status: "idle" | "loading" | "succeeded" | "failed";
  tracksUrl: string[];
  currentQueue: IPlaylist;
  isDisplayed: boolean;
  error: string | undefined;
}

const initialState: tracksState = {
  status: "idle",
  tracksUrl: [],
  currentQueue: emptyPlaylist,
  error: undefined,
  isDisplayed: false,
};

export const fetchTracksUrl = createAsyncThunk(
  "queue/current",
  async ({ user, kind }: any): Promise<string[]> => {
    const { data } = await axios.get(
      `http://localhost:3002/playlists/urls/user=${user}/kind=${kind}/`
    );
    return data;
  }
);

const queueSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setCurrentQueue(state, action: PayloadAction<IPlaylist>) {
      state.currentQueue = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTracksUrl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTracksUrl.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tracksUrl = action.payload;
      })
      .addCase(fetchTracksUrl.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setCurrentQueue } = queueSlice.actions;
export const currentQueue = (state: RootState) =>
  state.currentQueueSlice.currentQueue;
export const status = (state: RootState) => state.currentQueueSlice.status;
export const isVisible = (state: RootState) =>
  state.currentQueueSlice.isDisplayed;
export const currentQueueSlice = queueSlice.reducer;
