import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer"; // Adjust the import based on your file structure
import eventReducer from "./eventSlice";
import attendeeReducer from "./attendeeSlice";

const store = configureStore({
  reducer: {
    event: eventReducer,
    attendees: attendeeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
