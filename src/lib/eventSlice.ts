import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
  eventName: string;
}

const initialState: EventState = {
  eventName: "",
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventName(state, action: PayloadAction<string>) {
      state.eventName = action.payload;
    },
  },
});

export const { setEventName } = eventSlice.actions;

export const inputtedEventName = (state: { event: EventState }) =>
  state.event.eventName;

export default eventSlice.reducer;
