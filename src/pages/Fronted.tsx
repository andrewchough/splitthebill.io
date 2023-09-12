import React from "react";

import { useNavigate } from "react-router-dom";

import { AttendeeProps } from "../utils/types";

interface FrontedProps {
  eventName: string;
  attendees: AttendeeProps[];
  setFronter: (attendeeName: string) => void;
}

export default function Fronted({
  eventName,
  attendees,
  setFronter,
}: FrontedProps) {
  const navigate = useNavigate();
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
              attendee.isFronter
                ? "attendee-button--fronter"
                : "attendee-button"
            }
            onClick={() => setFronter(attendee.name)}
          >
            {attendee.name}
          </button>
        ))}
      </div>
      <div className="button-container">
        <button
          onClick={() => navigate("/assign-items")}
          className="button secondary-button"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/summary")}
          className="button cta-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
