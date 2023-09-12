import React from "react";

import { useNavigate } from "react-router-dom";
import { AttendeeProps } from "../utils/types";

interface SummaryProps {
  eventName: string;
  attendees: AttendeeProps[];
}

export default function Summary({ eventName, attendees }: SummaryProps) {
  const navigate = useNavigate();
  return (
    <div className="summary-container">
      <p className="event-name-header">Event name: </p>
      <h1>{eventName}</h1>
      <h4 className="summary-subtitle">This is how much everyone owes <u>Andrew</u></h4>
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
