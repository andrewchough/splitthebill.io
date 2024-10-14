import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendeeProps, ItemProps } from "../utils/types";
import { setFronter } from "./eventSlice"; // Import the setFronter action

const initialState: AttendeeProps[] = [];

const attendeesSlice = createSlice({
  name: "attendees",
  initialState,
  reducers: {
    addAttendee(state, action: PayloadAction<AttendeeProps>) {
      state.push({ ...action.payload, total: 0, items: [], isFronter: false });
    },
    removeAttendee(state, action: PayloadAction<string>) {
      return state.filter((attendee) => attendee.name !== action.payload);
    },
    addAttendeeItem(
      state,
      action: PayloadAction<{ attendeeName: string; item: ItemProps }>
    ) {
      const { attendeeName, item } = action.payload;
      const attendee = state.find((a) => a.name === attendeeName);
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
  extraReducers: (builder) => {
    builder.addCase(setFronter, (state, action) => {
      return state.map((attendee) => ({
        ...attendee,
        isFronter: attendee.name === action.payload,
      }));
    });
  },
});

export const { addAttendee, removeAttendee, addAttendeeItem } =
  attendeesSlice.actions;

export default attendeesSlice.reducer;
