"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { RootState } from "src/lib/store";
import { inputtedEventName } from "src/lib/eventSlice";
import { addAttendee, removeAttendee } from "src/lib/attendeeSlice";
import { AttendeeProps } from "src/utils/types";
import AttendeeTag from "./AttendeeTag";

export default function Attendees() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [showAttendeesError, setShowAttendeesError] = useState(false);
  const eventName = useSelector(inputtedEventName);
  const attendees = useSelector((state: RootState) => state.attendees);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      dispatch(addAttendee(inputValue.trim()));
      setInputValue("");
    }
  };

  const handleNextButtonClick = () => {
    if (attendees.length <= 0) {
      setShowAttendeesError(true);
    } else {
      setShowAttendeesError(false);
      router.push("/items");
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
          onChange={(e) => {
            setShowAttendeesError(false);
            setInputValue(e.target.value);
          }}
          onKeyDown={handleKeyPress}
          placeholder="Enter attendee name..."
          className="text-input--quiet attendees-input"
        />
      </h4>
      {showAttendeesError && (
        <p className="m-0 error-text bold">At least one attendee is required</p>
      )}
      <div className="button-container">
        <button
          onClick={() => router.push("/")}
          className="button secondary-button"
        >
          Back
        </button>
        <button onClick={handleNextButtonClick} className="button cta-button">
          Next
        </button>
      </div>
    </div>
  );
}
