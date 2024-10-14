import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";
import attendeeReducer from "./attendeeSlice";
import itemsReducer from "./itemsSlice";

const store = configureStore({
  reducer: {
    event: eventReducer,
    attendees: attendeeReducer,
    items: itemsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
