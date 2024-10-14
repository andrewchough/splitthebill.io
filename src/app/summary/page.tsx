"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { inputtedEventName } from "src/lib/eventSlice";
import { RootState } from "src/lib/store";

export default function Summary() {
  const router = useRouter();

  const eventName = useSelector(inputtedEventName);
  const attendees = useSelector((state: RootState) => state.attendees);
  const fronter = useSelector((state: RootState) => state.event.fronter);

  return (
    <div className="summary-container">
      <p className="event-name-header">Event name: </p>
      <h1>{eventName}</h1>
      <h4 className="summary-subtitle">
        This is how much everyone owes <u>{fronter}</u>.
      </h4>
      {attendees.map(
        (attendee) =>
          !attendee.isFronter && (
            <div className="summary-row" key={`${attendee.name}-summary-row`}>
              <h2>{attendee.name}</h2>
              <h2 className="summary-total">{`$${attendee.finalTotal.toFixed(
                2,
              )}`}</h2>
            </div>
          ),
      )}
      <div className="button-container">
        <button
          onClick={() => router.push("/assign-items")}
          className="button secondary-button"
        >
          Back
        </button>
        <button onClick={() => router.push("/")} className="button cta-button">
          Split another bill
        </button>
      </div>
    </div>
  );
}
