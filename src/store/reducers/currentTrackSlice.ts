import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface playerState {
  isPlaying: boolean;
  index: number | null;
  currentTrackId: string;
  currentTrackAlbumId: number;
  currentTrackCover: string;
  currentTrackTitle: string;
  currentTrackArtists: [];
  currentTrackUrl: string;
  status: "idle" | "loading" | "succeeded" | "failed" | "playing";
}

const initialState: playerState = {
  isPlaying: false,
  index: null,
  currentTrackId: "",
  currentTrackAlbumId: 0,
  currentTrackCover: "",
  currentTrackTitle: "",
  currentTrackArtists: [],
  currentTrackUrl: "",
  status: "idle",
};

export const fetchTrackUrl = createAsyncThunk(
  "track/current",
  async (id: string) => {
    console.log(id);

    const userData = JSON.parse(localStorage.getItem("user-data") || "");
    const { data } = await axios.get(
      `http://localhost:3002/get-mp3-link/id=${id}/username=${userData.username}/password=${userData.password}`
    );
    console.log(data);
    return { url: data.url, info: data.info[0] };
  }
);

const currentTrack = createSlice({
  name: "setPlayerTime",
  initialState,
  reducers: {
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setIndex(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
    setCurrentTrackId(state, action: PayloadAction<string>) {
      state.currentTrackId = action.payload;
    },
    setCurrentTrackAlbum(state, action: PayloadAction<number>) {
      state.currentTrackAlbumId = action.payload;
    },
    setTrackStatus(
      state,
      action: PayloadAction<
        "idle" | "loading" | "succeeded" | "failed" | "playing"
      >
    ) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTrackUrl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrackUrl.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentTrackUrl = action.payload.url;
        state.currentTrackArtists = action.payload.info.artists;
        state.currentTrackCover = `https://${action.payload.info.coverUri.replace(
          "%%",
          "50x50"
        )}`;
        state.currentTrackTitle = action.payload.info.title;
      })
      .addCase(fetchTrackUrl.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectIndex = (state: RootState) => state.currentTrack.index;
export const selectIsPlaying = (state: RootState) =>
  state.currentTrack.isPlaying;
export const trackId = (state: RootState) => state.currentTrack.currentTrackId;
export const trackUrl = (state: RootState) =>
  state.currentTrack.currentTrackUrl;
export const trackStatus = (state: RootState) => state.currentTrack.status;
export const trackCover = (state: RootState) =>
  state.currentTrack.currentTrackCover;
export const trackTitle = (state: RootState) =>
  state.currentTrack.currentTrackTitle;
export const trackArtists = (state: RootState) =>
  state.currentTrack.currentTrackArtists;
export const isTrackPlaying = (state: RootState) =>
  state.currentTrack.isPlaying;
export const trackAlbum = (state: RootState) =>
  state.currentTrack.currentTrackAlbumId;
export const {
  setIsPlaying,
  setIndex,
  setCurrentTrackId,
  setTrackStatus,
  setCurrentTrackAlbum,
} = currentTrack.actions;
export default currentTrack.reducer;
