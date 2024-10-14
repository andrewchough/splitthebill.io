import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer"; // Adjust the import based on your file structure
import eventReducer from "./eventSlice";
import attendeeReducer from "./attendeeSlice";
import itemsReducer from "./itemsSlice";
import assignItemsSliceReducer from "./assignItemsSlice";

const store = configureStore({
  reducer: {
    event: eventReducer,
    attendees: attendeeReducer,
    items: itemsReducer,
    assignItems: assignItemsSliceReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
