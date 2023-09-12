import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import AttendeeTag from "../components/AttendeeTag";
import { AttendeeProps } from "../utils/types";

interface AttendeesProps {
  eventName: string;
  attendees: AttendeeProps[];
  addAttendee: (attendeeName: AttendeeProps) => void;
  removeAttendee: (attendeeName: string) => void;
}

export default function Attendees({
  eventName,
  attendees,
  addAttendee,
  removeAttendee,
}: AttendeesProps) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      addAttendee({ name: inputValue.trim(), items: [], isFronter: false, total: 0 });
      setInputValue("");
    }
  };

  return (
    <div className="attendees-container">
      <p className="event-name-header">Event name:</p>
      <h1 className="event-name">{eventName}</h1>
      <h4>
        Attendees:
        <div className="tags-container">
          {attendees.map((attendee, index) => (
            <AttendeeTag
              attendee={attendee}
              removeAttendee={removeAttendee}
              key={`${attendee}-${index}`}
            />
          ))}
        </div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter attendee name..."
          className="text-input--quiet attendees-input"
        />
      </h4>
      <div className="button-container">
        <button onClick={() => navigate("/")} className="button secondary-button">Back</button>
        <button onClick={() => navigate("/items")} className="button cta-button">Next</button>
      </div>
    </div>
  );
}
