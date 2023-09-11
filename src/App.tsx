import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import AssignItems from "./pages/AssignItems";
import Attendees from "./pages/Attendees";
import Fronted from "./pages/Fronted";
import HomePage from "./pages/HomePage";
import Items from "./pages/Items";

import { useAppReducer } from "./hooks/appReducer";

export default function App() {
  const {
    eventName,
    attendees,
    items,
    subtotal,
    total,
    setEventName,
    addAttendee,
    removeAttendee,
    addItemDetails,
    editItemDetails,
    setTip,
    setTax,
    addAttendeeItem,
  } = useAppReducer();

  return (
    <Routes>
      <Route path="/" element={<HomePage setEventName={setEventName} />} />
      <Route
        path="/attendees"
        element={
          <Attendees
            eventName={eventName}
            attendees={attendees}
            addAttendee={addAttendee}
            removeAttendee={removeAttendee}
          />
        }
      />
      <Route
        path="/items"
        element={
          <Items
            eventName={eventName}
            addItemDetails={addItemDetails}
            editItemDetails={editItemDetails}
            setTip={setTip}
            setTax={setTax}
            items={items}
            subtotal={subtotal}
            total={total}
          />
        }
      />
      <Route
        path="/assign-items"
        element={
          <AssignItems
            eventName={eventName}
            items={items}
            attendees={attendees}
            addAttendeeItem={addAttendeeItem}
          />
        }
      />
      <Route
        path="/fronted"
        element={<Fronted eventName={eventName} attendees={attendees} />}
      />
    </Routes>
  );
}
