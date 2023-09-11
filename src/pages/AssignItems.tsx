import React from "react";
import { useNavigate } from "react-router-dom";

import AssignItemRow from "../components/AssignItemRow";

import { AttendeeProps, ItemProps } from "../utils/types";

interface ItemsProps {
  eventName: string;
  items: ItemProps[];
  attendees: AttendeeProps[];
  addAttendeeItem: any;
}

export default function AssignItems({
  eventName,
  items,
  attendees,
  addAttendeeItem,
}: ItemsProps) {
  const navigate = useNavigate();
  return (
    <>
      <h1>{eventName}</h1>
      <p>Assign each item to a person</p>
      {items.map((item) => (
        <AssignItemRow
          key={item.index}
          index={item.index + 1}
          item={item}
          attendees={attendees}
          addAttendeeItem={addAttendeeItem}
        />
      ))}
      <button onClick={() => navigate("/fronted")}>Next</button>
    </>
  );
}
