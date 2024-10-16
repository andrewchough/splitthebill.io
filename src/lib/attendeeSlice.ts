import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { ItemProps } from "../utils/types";

import { RootState } from "./store";

interface AttendeeProps {
  name: string;
  items: ItemProps[];
  finalTotal: number;
  isFronter: boolean;
}

const initialState: AttendeeProps[] = [];

export const calculateFinalAmounts = createAsyncThunk(
  "attendees/calculateFinalAmounts",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const attendees = state.attendees;
    const { tip, tax } = state.items;
    const totalSharedCosts = tip + tax;

    const individualTotals = attendees.map((attendee) => ({
      name: attendee.name,
      total: attendee.items.reduce((sum, item) => sum + item.cost, 0),
      isFronter: attendee.isFronter,
    }));

    const overallTotal = individualTotals.reduce(
      (sum, ind) => sum + ind.total,
      0,
    );

    const withSharedCosts = individualTotals.map((ind) => {
      const proportion = ind.total / overallTotal;
      const sharedCostShare = totalSharedCosts * proportion;
      return {
        ...ind,
        finalTotal: ind.total + sharedCostShare,
      };
    });

    const fronter = withSharedCosts.find((att) => att.isFronter);
    if (!fronter) {
      throw new Error("No fronter found");
    }

    return attendees.map((attendee) => {
      const calculated = withSharedCosts.find(
        (att) => att.name === attendee.name,
      );
      if (!calculated) {
        throw new Error(`Calculation not found for ${attendee.name}`);
      }
      return {
        ...attendee,
        finalTotal: attendee.isFronter ? 0 : calculated.finalTotal,
      };
    });
  },
);

const attendeesSlice = createSlice({
  name: "attendees",
  initialState,
  reducers: {
    addAttendee(state, action: PayloadAction<string>) {
      state.push({
        name: action.payload,
        items: [],
        finalTotal: 0,
        isFronter: false,
      });
    },
    removeAttendee(state, action: PayloadAction<string>) {
      return state.filter((attendee) => attendee.name !== action.payload);
    },
    addAttendeeItem(
      state,
      action: PayloadAction<{ attendeeName: string; item: ItemProps }>,
    ) {
      const { attendeeName, item } = action.payload;

      state.forEach((attendee) => {
        attendee.items = attendee.items.filter((i) => i.name !== item.name);
      });

      const attendee = state.find((a) => a.name === attendeeName);
      if (attendee) {
        attendee.items.push(item);
      }
    },
    updateFronterStatus(state, action: PayloadAction<string>) {
      return state.map((attendee) => ({
        ...attendee,
        isFronter: attendee.name === action.payload,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(calculateFinalAmounts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {
  addAttendee,
  removeAttendee,
  addAttendeeItem,
  updateFronterStatus,
} = attendeesSlice.actions;

export default attendeesSlice.reducer;
