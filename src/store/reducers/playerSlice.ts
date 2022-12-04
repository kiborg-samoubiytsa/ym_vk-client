import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IPlayer {
  isVisible: boolean;
  isInRadioMode: boolean;
}

const initialState: IPlayer = { isVisible: false, isInRadioMode: false };

const togglePlayer = createSlice({
  name: "togglePlayer",
  initialState,
  reducers: {
    setPlayerVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
    setIsRadioMode(state, action: PayloadAction<boolean>) {
      state.isInRadioMode = action.payload;
    },
  },
});

export const isPlayerVisible = (state: RootState) =>
  state.setPlayerVisible.isVisible;

export const { setPlayerVisible, setIsRadioMode } = togglePlayer.actions;
export default togglePlayer.reducer;
