import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AssignItems from "./pages/AssignItems";
import Attendees from "./pages/Attendees";
import Fronted from "./pages/Fronted";
import HomePage from "./pages/HomePage";
import Items from "./pages/Items";
import Summary from "./pages/Summary";
import { RootState, AppDispatch } from "./lib/store";

import {
  setEventName,
  addAttendee,
  removeAttendee,
  addItemDetails,
  editItemDetails,
  setTip,
  setTax,
  addAttendeeItem,
  setFronter,
} from "./lib/appReducer";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  // const { eventName, attendees, items, subtotal, total, fronter } = useSelector(
  //   (state: RootState) => state.app
  // );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/attendees" element={<Attendees />} />
      {/* 
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
        element={
          <Fronted
            eventName={eventName}
            attendees={attendees}
            setFronter={setFronter}
          />
        }
      />
      <Route
        path="/summary"
        element={
          <Summary
            eventName={eventName}
            attendees={attendees}
            fronter={fronter}
          />
        }
      /> */}
    </Routes>
  );
}
