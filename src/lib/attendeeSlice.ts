import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendeeProps } from "../utils/types";

const initialState: AttendeeProps[] = [];

const attendeesSlice = createSlice({
  name: "attendees",
  initialState,
  reducers: {
    addAttendee(state, action: PayloadAction<AttendeeProps>) {
      
      console.log(action.payload);
      state.push({ ...action.payload, total: 0, items: [] });
    },
    removeAttendee(state, action: PayloadAction<string>) {
      return state.filter((attendee) => attendee.name !== action.payload);
    },
    addAttendeeItem(
      state,
      action: PayloadAction<{ attendeeName: string; item: any }>
    ) {
      const { attendeeName, item } = action.payload;
      const attendee = state.find((attendee) => attendee.name === attendeeName);
      if (attendee) {
        const hasItem = attendee.items.some((i) => i.name === item.name);
        if (!hasItem) {
          attendee.items.push(item);
          attendee.total = parseFloat((attendee.total + item.cost).toFixed(2));
        } else {
          const index = attendee.items.findIndex((i) => i.name === item.name);
          if (index > -1) {
            attendee.items.splice(index, 1);
            attendee.total = parseFloat(
              (attendee.total - item.cost).toFixed(2)
            );
          }
        }
      }
    },
  },
});

export const { addAttendee, removeAttendee, addAttendeeItem } =
  attendeesSlice.actions;

export default attendeesSlice.reducer;
