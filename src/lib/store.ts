import { configureStore } from "@reduxjs/toolkit";

import attendeeReducer from "./attendeeSlice";
import eventReducer from "./eventSlice";
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
