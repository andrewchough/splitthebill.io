import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendeeProps, ItemProps, State } from "../utils/types";

const initialState: State = {
  eventName: "",
  attendees: [],
  items: [],
  tax: 0,
  tip: 0,
  subtotal: 0,
  total: 0,
  fronter: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setEventName(state, action: PayloadAction<string>) {
      state.eventName = action.payload;
    },
    addAttendee(state, action: PayloadAction<AttendeeProps>) {
      state.attendees.push({ ...action.payload, total: 0, items: [] });
    },
    removeAttendee(state, action: PayloadAction<string>) {
      state.attendees = state.attendees.filter(
        (attendee) => attendee.name !== action.payload
      );
    },
    addItemDetails(state, action: PayloadAction<Partial<ItemProps>>) {
      const newItem = {
        ...action.payload,
        index: state.items.length,
      } as ItemProps;
      state.items.push(newItem);
      const subtotal = state.items.reduce((sum, item) => sum + item.cost, 0);
      const total = subtotal + state.tax + state.tip;
      state.subtotal = subtotal;
      state.total = total;
    },
    editItemDetails(
      state,
      action: PayloadAction<{ index: number; data: Partial<ItemProps> }>
    ) {
      const { index, data } = action.payload;
      state.items[index] = { ...state.items[index], ...data };
      const subtotal = state.items.reduce((sum, item) => sum + item.cost, 0);
      const total = subtotal + state.tax + state.tip;
      state.subtotal = subtotal;
      state.total = total;
    },
    setTip(state, action: PayloadAction<number>) {
      state.tip = action.payload;
      const newTotal = state.subtotal + state.tax + state.tip;
      const equalShareOfTaxAndTip =
        (state.tax + state.tip) / state.attendees.length;
      state.total = newTotal;
      state.attendees = state.attendees.map((attendee) => {
        const attendeeSubtotal = attendee.items.reduce(
          (sum, item) => sum + item.cost,
          0
        );
        return {
          ...attendee,
          total: parseFloat(
            (attendeeSubtotal + equalShareOfTaxAndTip).toFixed(2)
          ),
        };
      });
    },
    setTax(state, action: PayloadAction<number>) {
      state.tax = action.payload;
      const newTotal = state.subtotal + state.tax + state.tip;
      const equalShareOfTaxAndTip =
        (state.tax + state.tip) / state.attendees.length;
      state.total = newTotal;
      state.attendees = state.attendees.map((attendee) => {
        const attendeeSubtotal = attendee.items.reduce(
          (sum, item) => sum + item.cost,
          0
        );
        return {
          ...attendee,
          total: parseFloat(
            (attendeeSubtotal + equalShareOfTaxAndTip).toFixed(2)
          ),
        };
      });
    },
    addAttendeeItem(
      state,
      action: PayloadAction<{ attendeeName: string; item: ItemProps }>
    ) {
      const { attendeeName, item } = action.payload;
      const previousOwner = state.attendees.find((attendee) =>
        attendee.items.some((i) => i.name === item.name)
      );
      state.attendees = state.attendees.map((attendee) => {
        if (attendee.name === attendeeName) {
          const hasItem = attendee.items.some((i) => i.name === item.name);
          if (!hasItem) {
            return {
              ...attendee,
              items: [...attendee.items, item],
              total: parseFloat((attendee.total + item.cost).toFixed(2)),
            };
          }
        }
        if (previousOwner && attendee.name === previousOwner.name) {
          const filteredItems = attendee.items.filter(
            (i) => i.name !== item.name
          );
          return {
            ...attendee,
            items: filteredItems,
            total: parseFloat((attendee.total - item.cost).toFixed(2)),
          };
        }
        return attendee;
      });
    },
    setFronter(state, action: PayloadAction<string>) {
      state.fronter = action.payload;
      state.attendees = state.attendees.map((attendee) => ({
        ...attendee,
        isFronter: attendee.name === action.payload,
      }));
    },
  },
});

export const {
  setEventName,
  addAttendee,
  removeAttendee,
  addItemDetails,
  editItemDetails,
  setTip,
  setTax,
  addAttendeeItem,
  setFronter,
} = appSlice.actions;

export default appSlice.reducer;
