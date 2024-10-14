import React from "react";

import { ItemProps, AttendeeProps } from "src/utils/types";

import AttendeesSelect from "./AttendeesSelect";

interface ItemRowProps {
  index: number;
  item: ItemProps;
  attendees: AttendeeProps[];
  addAttendeeItem: any;
}

export default function AssignItemRow({
  index,
  item,
  attendees,
  addAttendeeItem,
}: ItemRowProps) {
  return (
    <div className="item-input-container">
      <div className="item-input">
        <label htmlFor={`name-${index}`}>Item {index}</label>
        <input
          disabled
          value={item?.name}
          className="item-input-textfield"
          id={`name-${index}`}
        />
      </div>
      <div className="item-input">
        <label htmlFor={`cost-${index}`}>Cost of Item {index}</label>
        <div>
          <input
            disabled
            value={item?.cost}
            className="item-input-textfield"
            type="number"
            placeholder="0.00"
            step="0.01"
            id={`cost-${index}`}
          />
        </div>
      </div>
      <AttendeesSelect
        options={attendees}
        index={index}
        onChange={addAttendeeItem}
        item={item}
      />
    </div>
  );
}
