import React from "react";
import { useNavigate } from "react-router-dom";

import AssignItemRow from "../components/AssignItemRow";

import { AttendeeProps, ItemProps } from "../utils/types";

interface ItemsProps {
  eventName: string;
  items: ItemProps[];
  attendees: AttendeeProps[];
  addAttendeeItem: any;
}

export default function AssignItems({
  eventName,
  items,
  attendees,
  addAttendeeItem,
}: ItemsProps) {
  const navigate = useNavigate();
  return (
    <div className="assign-items-container">
      <p className="event-name-header">Event name:</p>
      <h1>{eventName}</h1>
      <h4 className="assign-items-subtitle">Assign each item to a person</h4>
      {items.map((item, index) => (
        <AssignItemRow
          key={index}
          index={index + 1}
          item={item}
          attendees={attendees}
          addAttendeeItem={addAttendeeItem}
        />
      ))}
      <div className="button-container">
        <button
          onClick={() => navigate("/items")}
          className="button secondary-button"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/fronted")}
          className="button cta-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
