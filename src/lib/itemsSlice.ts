import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ItemProps } from "../utils/types";

interface ItemsState {
  items: ItemProps[];
  subtotal: number;
  total: number;
  tax: number;
  tip: number;
}

const initialState: ItemsState = {
  items: [],
  subtotal: 0,
  total: 0,
  tax: 0,
  tip: 0,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItemDetails(state, action: PayloadAction<Partial<ItemProps>>) {
      const newItem = {
        ...action.payload,
        index: state.items.length,
      } as ItemProps;
      state.items.push(newItem);
      state.subtotal = state.items.reduce((sum, item) => sum + item.cost, 0);
      state.total = state.subtotal + state.tax + state.tip;
    },
    editItemDetails(
      state,
      action: PayloadAction<{ index: number; data: Partial<ItemProps> }>,
    ) {
      const { index, data } = action.payload;
      state.items[index] = { ...state.items[index], ...data };
      state.subtotal = state.items.reduce((sum, item) => sum + item.cost, 0);
      state.total = state.subtotal + state.tax + state.tip;
    },
    setTip(state, action: PayloadAction<number>) {
      state.tip = action.payload;
      state.total = state.subtotal + state.tax + state.tip;
    },
    setTax(state, action: PayloadAction<number>) {
      state.tax = action.payload;
      state.total = state.subtotal + state.tax + state.tip;
    },
  },
});

export const { addItemDetails, editItemDetails, setTip, setTax } =
  itemsSlice.actions;

export default itemsSlice.reducer;
