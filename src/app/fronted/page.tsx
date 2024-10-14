"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFronterStatus,
  calculateFinalAmounts,
} from "src/lib/attendeeSlice";
import { inputtedEventName, setFronter } from "src/lib/eventSlice";
import { AppDispatch, RootState } from "src/lib/store";

export default function Fronted() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const eventName = useSelector(inputtedEventName);
  const attendees = useSelector((state: RootState) => state.attendees);
  const fronter = useSelector((state: RootState) => state.event.fronter);

  const handleSetFronter = (attendeeName: string) => {
    dispatch(setFronter(attendeeName));
    dispatch(updateFronterStatus(attendeeName));
  };

  const handleNext = () => {
    dispatch(calculateFinalAmounts());
    router.push("/summary");
  };

  return (
    <div className="fronted-container">
      <p className="event-name-header">Event name: </p>
      <h1>{eventName}</h1>
      <h4 className="fronted-subtitle">Who fronted the bill?</h4>
      <div className="attendees-container--fronted">
        {attendees.map((attendee) => (
          <button
            key={attendee.name}
            className={
              attendee.name === fronter
                ? "attendee-button--fronter"
                : "attendee-button"
            }
            onClick={() => handleSetFronter(attendee.name)}
          >
            {attendee.name}
          </button>
        ))}
      </div>
      <div className="button-container">
        <button
          onClick={() => router.push("/assign-items")}
          className="button secondary-button"
        >
          Back
        </button>
        <button onClick={handleNext} className="button cta-button">
          Next
        </button>
      </div>
    </div>
  );
}
