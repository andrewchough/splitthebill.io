"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

import { setEventName } from "../lib/eventSlice";
import { AppDispatch } from "../lib/store";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [eventNameInput, setEventNameInput] = useState("");
  const [showEventNameError, setShowEventNameError] = useState(false);

  const onSubmitClick = () => {
    if (!eventNameInput) {
      setShowEventNameError(true);
      return;
    } else {
      dispatch(setEventName(eventNameInput));
      router.push("/attendees");
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-header">Split the Bill</h1>
      <h4 className="homepage-subtitle">This is for:</h4>
      <input
        value={eventNameInput}
        onChange={(e) => {
          setShowEventNameError(false);
          setEventNameInput(e.target.value);
        }}
        className="text-input--quiet"
      />
      {showEventNameError && (
        <p className="error-text bold">Event name is required</p>
      )}
      <button onClick={onSubmitClick} className="button cta-button">
        Next
      </button>
    </div>
  );
}
