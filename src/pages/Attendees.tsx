import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AttendeeTag from "../components/AttendeeTag";
import { AttendeeProps } from "../utils/types";
import { addAttendee, removeAttendee } from "../lib/attendeeSlice";
import { inputtedEventName } from "../lib/eventSlice";

export default function Attendees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const eventName = useSelector(inputtedEventName);
  const attendees = useSelector((state: any) => state.attendees);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      console.log("Adding attendee");
      console.log(inputValue.trim());
      dispatch(
        addAttendee({
          name: inputValue.trim(),
          items: [],
          isFronter: false,
          total: 0,
        })
      );
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
          {attendees?.map((attendee: AttendeeProps, index: number) => (
            <AttendeeTag
              attendee={attendee}
              removeAttendee={(name: string) => dispatch(removeAttendee(name))}
              key={`${attendee.name}-${index}`}
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
        <button
          onClick={() => navigate("/")}
          className="button secondary-button"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/items")}
          className="button cta-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
