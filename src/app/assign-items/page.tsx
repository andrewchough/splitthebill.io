"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { addAttendeeItem, calculateFinalAmounts } from "src/lib/attendeeSlice";
import { inputtedEventName } from "src/lib/eventSlice";
import { AppDispatch, RootState } from "src/lib/store";
import { ItemProps } from "src/utils/types";

import AssignItemRow from "./AssignItemRow";

export default function AssignItems() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const eventName = useSelector(inputtedEventName);
  const items = useSelector((state: RootState) => state.items.items);
  const attendees = useSelector((state: RootState) => state.attendees);

  const handleAddAttendeeItem = (attendeeName: string, item: ItemProps) => {
    dispatch(addAttendeeItem({ attendeeName, item }));
    dispatch(calculateFinalAmounts());
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
          onClick={() => router.push("/items")}
          className="button secondary-button"
        >
          Back
        </button>
        <button
          onClick={() => router.push("/fronted")}
          className="button cta-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
