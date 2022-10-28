import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getYourWaveSequence } from "../../requests/getYourWaveSequence";
import { IRotorTrack } from "../../types/types";

interface IRotor {
  currentQueue: IRotorTrack[];
  status: "idle" | "loading" | "succeeded" | "failed";
}
const initialState: IRotor = {
  currentQueue: [],
  status: "idle",
};
export const fetchRotorQueue = createAsyncThunk(
  "fetch/rotorQueue",
  async () => {
    const userData = JSON.parse(localStorage.getItem("user-data") || "");
    const data = await getYourWaveSequence(
      userData.username,
      userData.password
    );
    console.log(data);
    return data;
  }
);
export const rotorSlice = createSlice({
  name: "rotorSlice",
  initialState: initialState,
  reducers: {
    setRotorQueue(state, action: PayloadAction<IRotorTrack[]>) {
      state.currentQueue = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRotorQueue.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRotorQueue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentQueue = action.payload;
      })
      .addCase(fetchRotorQueue.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const { setRotorQueue } = rotorSlice.actions;
export const rotorSliceReducer = rotorSlice.reducer;
