import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface EventState {
  eventName: string;
  fronter: string;
}

const initialState: EventState = {
  eventName: "",
  fronter: "",
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventName(state, action: PayloadAction<string>) {
      state.eventName = action.payload;
    },
    setFronter(state, action: PayloadAction<string>) {
      state.fronter = action.payload;
    },
  },
});

export const { setEventName, setFronter } = eventSlice.actions;

export const inputtedEventName = (state: RootState) => state.event.eventName;

export default eventSlice.reducer;
