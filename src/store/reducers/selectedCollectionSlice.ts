import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AlbumWithTracks, IPlaylist } from "../../types/types";
import axios from "axios";
import { RootState } from "../store";

interface CollectionState {
  isPlaylistSelected: boolean;
  playlistInfo: IPlaylist | AlbumWithTracks;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  type: "not-selected" | "playlist" | "album";
}

const initialState: CollectionState = {
  isPlaylistSelected: false,
  playlistInfo: {} as IPlaylist | AlbumWithTracks,
  status: "idle",
  error: undefined,
  type: "not-selected",
};

export const fetchPlaylist = createAsyncThunk(
  "collection/fetchPlaylist",
  async ({ user, kind }: any): Promise<IPlaylist> => {
    console.log(user, kind);
    const { data } = await axios.get(
      `http://localhost:3002/playlists/info/user=${user}/kind=${kind}/`
    );
    console.log(data);
    return data;
  }
);
export const fetchAlbum = createAsyncThunk(
  "collection/fetchAlbum",
  async ({ albumId }: any): Promise<AlbumWithTracks> => {
    const { data } = await axios.get(
      `http://localhost:3002/album/with-tracks/id=${albumId}`
    );
    return data;
  }
);

export const currentPlaylistSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setIsSelected(state, action: PayloadAction<boolean>) {
      state.isPlaylistSelected = action.payload;
    },
    setSelectedCollectionType(
      state,
      action: PayloadAction<CollectionState["type"]>
    ) {
      state.type = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlaylist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.type = "playlist";
        state.playlistInfo = action.payload;
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAlbum.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAlbum.fulfilled, (state, action) => {
        state.playlistInfo = action.payload;
        state.status = "succeeded";
        state.type = "album";
      })
      .addCase(fetchAlbum.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const selectedCollection = (state: RootState) =>
  state.playlistSlice.playlistInfo;
export const status = (state: RootState) => state.playlistSlice.status;
export const isSelected = (state: RootState) =>
  state.playlistSlice.isPlaylistSelected;
export const collectionType = (state: RootState) => state.playlistSlice.type;
export const { setIsSelected, setSelectedCollectionType } =
  currentPlaylistSlice.actions;
export const playlistSlice = currentPlaylistSlice.reducer;
