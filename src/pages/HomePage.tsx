import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

interface HomePageProps {
  setEventName: (arg: string) => void;
}

export default function HomePage({ setEventName }: HomePageProps) {
  const navigate = useNavigate();
  const [eventNameInput, setEventNameInput] = useState("");

  const onSubmitClick = () => {
    setEventName(eventNameInput);
    navigate("/attendees");
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-header">Split the Bill</h1>
      <h4 className="homepage-subtitle">This is for:</h4>
      <input onChange={(e) => setEventNameInput(e.target.value)} className="text-input--quiet" />
      <button onClick={onSubmitClick} className="cta-button">Next</button>
    </div>
  );
}
