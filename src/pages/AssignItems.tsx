import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { addAttendeeItem } from "../lib/attendeeSlice";
import { inputtedEventName } from "../lib/eventSlice";

import AssignItemRow from "../components/AssignItemRow";
import { ItemProps } from "../utils/types";

export default function AssignItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const eventName = useSelector(inputtedEventName);
  const items = useSelector((state: RootState) => state.items.items);
  const attendees = useSelector((state: RootState) => state.attendees);

  const handleAddAttendeeItem = (attendeeName: string, item: ItemProps) => {
    dispatch(addAttendeeItem({ attendeeName, item }));
  };

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
          addAttendeeItem={handleAddAttendeeItem}
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
