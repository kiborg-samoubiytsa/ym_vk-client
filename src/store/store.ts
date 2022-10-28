import { configureStore } from "@reduxjs/toolkit";
import setPlayerVisible from "./reducers/playerSlice";
import currentTrack from "./reducers/currentTrackSlice";
import { playlistSlice } from "./reducers/selectedPlaylistSlice";
import { currentQueueSlice } from "./reducers/currentQueueSlice";
import { rotorSliceReducer } from "./reducers/rotorSlice";

export const store = configureStore({
  reducer: {
    setPlayerVisible,
    currentTrack,
    playlistSlice,
    currentQueueSlice,
    rotorSliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
