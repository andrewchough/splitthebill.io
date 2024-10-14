import "./App.css";
import { Route, Routes } from "react-router-dom";

import AssignItems from "./pages/AssignItems";
import Attendees from "./pages/Attendees";
import Fronted from "./pages/Fronted";
import HomePage from "./pages/HomePage";
import Items from "./pages/Items";
import Summary from "./pages/Summary";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/attendees" element={<Attendees />} />
      <Route path="/items" element={<Items />} />
      <Route path="/assign-items" element={<AssignItems />} />
      <Route path="/fronted" element={<Fronted />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
  );
}
