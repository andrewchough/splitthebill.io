import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEventName } from "../lib/eventSlice";
import { AppDispatch } from "../lib/store";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [eventNameInput, setEventNameInput] = useState("");
  const [showEventNameError, setShowEventNameError] = useState(false);

  const onSubmitClick = () => {
    dispatch(setEventName(eventNameInput));
    navigate("/attendees");
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-header">Split the Bill</h1>
      <h4 className="homepage-subtitle">This is for:</h4>
      <input
        value={eventNameInput}
        onChange={(e) => setEventNameInput(e.target.value)}
        className="text-input--quiet"
      />
      <p className="error-text bold">Event name is required</p>
      <button onClick={onSubmitClick} className="button cta-button">
        Next
      </button>
    </div>
  );
}
