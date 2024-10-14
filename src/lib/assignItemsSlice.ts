import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendeeProps, ItemProps } from "../utils/types";

interface AssignItemsState {
  attendees: AttendeeProps[];
}

const initialState: AssignItemsState = {
  attendees: [],
};

const assignItemsSlice = createSlice({
  name: "assignItems",
  initialState,
  reducers: {
    addAttendeeItem(
      state,
      action: PayloadAction<{ attendeeName: string; item: ItemProps }>
    ) {
      const { attendeeName, item } = action.payload;
      const attendee = state.attendees.find((a) => a.name === attendeeName);
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

export const { addAttendeeItem } = assignItemsSlice.actions;

export default assignItemsSlice.reducer;
