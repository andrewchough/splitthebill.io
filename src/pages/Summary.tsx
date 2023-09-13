import React from "react";

import { useNavigate } from "react-router-dom";
import { AttendeeProps } from "../utils/types";

interface SummaryProps {
  eventName: string;
  attendees: AttendeeProps[];
  fronter: string;
}

export default function Summary({ eventName, attendees, fronter }: SummaryProps) {
  const navigate = useNavigate();
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
              <h2 className="summary-total">{`$${(attendee.total).toFixed(2)}`}</h2>
            </div>
          )
      )}
      <div className="button-container">
        <button
          onClick={() => navigate("/assign-items")}
          className="button secondary-button"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="button cta-button"
        >
          Split another bill
        </button>
      </div>
    </div>
  );
}
