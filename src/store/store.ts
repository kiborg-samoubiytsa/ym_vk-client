import { configureStore } from "@reduxjs/toolkit";
import setPlayerVisible from "./reducers/playerSlice";
import currentTrack from "./reducers/currentTrackSlice";
import { playlistSlice } from "./reducers/selectedCollectionSlice";
import { currentQueueSlice } from "./reducers/currentQueueSlice";
import { rotorSliceReducer } from "./reducers/rotorSlice";
import favoriteTracksSliceReducer from "./reducers/favoriteTracksSlice";

export const store = configureStore({
  reducer: {
    setPlayerVisible,
    currentTrack,
    playlistSlice,
    currentQueueSlice,
    rotorSliceReducer,
    favoriteTracksSliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
