import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import {
  addItemDetails,
  editItemDetails,
  setTip,
  setTax,
} from "../lib/itemsSlice";
import { inputtedEventName } from "../lib/eventSlice";

import ItemRow from "../components/ItemRow";
import BillExtras from "../components/BillExtras";

export default function Items() {
  const [numberOfRows, setNumberOfRows] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const eventName = useSelector(inputtedEventName);
  const { items, subtotal, total, tip, tax } = useSelector(
    (state: RootState) => state.items,
  );

  const handleOnBlur = (
    field: "name" | "cost",
    value: string | number,
    index: number,
  ) => {
    if (index < items.length) {
      if (field === "name") {
        dispatch(editItemDetails({ index, data: { name: value as string } }));
      } else if (field === "cost") {
        dispatch(editItemDetails({ index, data: { cost: Number(value) } }));
      }
    } else {
      if (field === "name") {
        dispatch(addItemDetails({ name: value as string, cost: 0 }));
      } else if (field === "cost") {
        dispatch(addItemDetails({ name: "", cost: Number(value) }));
      }
    }
  };

  const handleMoneyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(".")) {
      const decimalParts = value.split(".");
      if (decimalParts[1].length > 2) {
        e.target.value = parseFloat(value).toFixed(2);
      }
    }
  };

  return (
    <div className="items-container">
      <p className="event-name-header">Event name:</p>
      <h1 className="event-name">{eventName}</h1>
      <h4 className="items-subtitle">Enter the bill details</h4>
      <ItemRow
        index={0}
        handleOnBlur={handleOnBlur}
        handleMoneyInputChange={handleMoneyInputChange}
      />
      {Array.from(Array(numberOfRows - 1).keys()).map((index) => (
        <ItemRow
          key={index + 1}
          index={index + 1}
          handleOnBlur={handleOnBlur}
          handleMoneyInputChange={handleMoneyInputChange}
        />
      ))}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => setNumberOfRows(numberOfRows + 1)}
          className="button primary-button"
        >
          Add another item
        </button>
      </div>
      <BillExtras
        setTip={(tipValue: number) => dispatch(setTip(tipValue))}
        setTax={(taxValue: number) => dispatch(setTax(taxValue))}
        subtotal={subtotal}
        total={total}
        tip={tip}
        tax={tax}
      />
      <div className="button-container">
        <button
          onClick={() => navigate("/attendees")}
          className="button secondary-button"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/assign-items")}
          className="button cta-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
