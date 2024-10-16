import React from "react";

import { AttendeeProps } from "src/utils/types";

interface AttendeeTagProps {
  attendee: AttendeeProps;
  removeAttendee: (attendeeName: string) => void;
}

function AttendeeTag({ attendee, removeAttendee }: AttendeeTagProps) {
  return (
    <div className="attendee-tag">
      {attendee.name}
      <button
        onClick={() => removeAttendee(attendee.name)}
        className="attendee-remove-button cursor-pointer"
      >
        X
      </button>
    </div>
  );
}

export default AttendeeTag;
