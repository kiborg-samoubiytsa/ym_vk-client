import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IPlaylist } from "../../types/types";
import axios from "axios";
import { RootState } from "../store";
import { Root } from "react-dom/client";

interface playlistState {
  isPlaylistSelected: boolean;
  playlistInfo: IPlaylist;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

export const fetchPlaylist = createAsyncThunk(
  "playlist/fetchPlaylist",
  async ({ user, kind }: any): Promise<IPlaylist> => {
    const userData = JSON.parse(localStorage.getItem("user-data") || "");
    console.log(user, kind);
    const { data } = await axios.get(
      `http://localhost:3002/playlists/info/user=${user}/kind=${kind}/username=${userData.username}/password=${userData.password}/`
    );
    console.log(data);
    return data;
  }
);
const initialState: playlistState = {
  isPlaylistSelected: false,
  playlistInfo: {
    owner: {
      uid: 0,
      login: "",
      name: "",
      verified: false,
      sex: "",
    },
    playlistUuid: "",
    available: false,
    uid: 0,
    kind: 0,
    title: "",
    revision: 0,
    snapshot: 0,
    trackCount: 0,
    visibility: "",
    collective: false,
    created: "",
    modified: "",
    isBanner: false,
    isPremiere: false,
    durationMs: 0,
    cover: { error: "", type: "", itemsUri: [], custom: false },
    ogImage: "",
    tags: [],
    prerolls: [],
    lastOwnerPlaylists: [],
    tracks: [],
  },
  status: "idle",
  error: undefined,
};

export const currentPlaylistSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setIsPlaylistSelected(state, action: PayloadAction<boolean>) {
      state.isPlaylistSelected = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlaylist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playlistInfo = action.payload;
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectedPlaylist = (state: RootState) =>
  state.playlistSlice.playlistInfo;
export const playlistStatus = (state: RootState) => state.playlistSlice.status;
export const isSelected = (state: RootState) =>
  state.playlistSlice.isPlaylistSelected;
export const { setIsPlaylistSelected } = currentPlaylistSlice.actions;
export const playlistSlice = currentPlaylistSlice.reducer;
