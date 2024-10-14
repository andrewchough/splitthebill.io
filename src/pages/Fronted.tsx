import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { setFronter } from "../lib/eventSlice";
import {
  updateFronterStatus,
  calculateFinalAmounts,
} from "../lib/attendeeSlice";
import { inputtedEventName } from "../lib/eventSlice";

export default function Fronted() {
  const navigate = useNavigate();
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
    navigate("/summary");
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
          onClick={() => navigate("/assign-items")}
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
