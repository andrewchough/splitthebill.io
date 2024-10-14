import React from "react";

import { AttendeeProps, ItemProps } from "../../utils/types";

interface AttendeesSelectProps {
  item: ItemProps;
  options: AttendeeProps[];
  onChange: (arg1: string, arg2: ItemProps) => void;
  index: number;
}

const AttendeesSelect = (props: AttendeesSelectProps) => {
  const { item, options, onChange, index } = props;
  return (
    <label htmlFor={`attendees-select-${index}`}>
      <select
        onChange={(e) => onChange(e.target.value, item)}
        id={`attendees-select-${index}`}
        defaultValue="none"
        className="assign-items-select"
      >
        <option disabled value="none">
          Assign an attendee
        </option>
        {options.map((option) => (
          <option key={option.name}>{option.name}</option>
        ))}
      </select>
    </label>
  );
};

export default AttendeesSelect;
