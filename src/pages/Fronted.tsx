import React from "react";
import { AttendeeProps } from "../utils/types";

interface FrontedProps {
  eventName: string;
  attendees: AttendeeProps[];
}

export default function Fronted({ eventName, attendees }: FrontedProps) {
  return (
    <>
      <h1>{eventName}</h1>
      <p>Who fronted the bill?</p>
      {attendees.map((attendee) => (
        <button key={attendee.name}>{attendee.name}</button>
      ))}
    </>
  );
}
