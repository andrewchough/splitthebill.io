import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import ItemRow from "../components/ItemRow";
import BillExtras from "../components/BillExtras";

import { ItemProps } from "../utils/types";

interface ItemsProps {
  eventName: string;
  addItemDetails: (item: Partial<ItemProps>) => void;
  editItemDetails: (index: number, data: Partial<ItemProps>) => void;
  setTip: (tip: number) => void;
  setTax: (tax: number) => void;
  subtotal: number;
  total: number;
  items: ItemProps[];
}

export default function Items({
  eventName,
  addItemDetails,
  editItemDetails,
  setTip,
  setTax,
  subtotal,
  total,
  items,
}: ItemsProps) {
  const [numberOfRows, setNumberOfRows] = useState(1);
  const navigate = useNavigate();

  const handleOnBlur = (
    field: "name" | "cost",
    value: string | number,
    index: number
  ) => {
    if (index < items.length) {
      // This indicates an existing item, hence we edit
      if (field === "name") {
        editItemDetails(index, { name: value as string });
      } else if (field === "cost") {
        editItemDetails(index, { cost: Number(value) });
      }
    } else {
      // This indicates a new item, hence we add
      if (field === "name") {
        addItemDetails({ name: value as string, cost: 0 });
      } else if (field === "cost") {
        addItemDetails({ name: "", cost: Number(value) });
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
        setTip={setTip}
        setTax={setTax}
        subtotal={subtotal}
        total={total}
        handleMoneyInputChange={handleMoneyInputChange}
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
