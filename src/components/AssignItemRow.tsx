import React from "react";

import { AttendeeProps, ItemProps } from "../utils/types";
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
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <p>
        Item {index} {index === 1 && <span>*</span>}
      </p>
      <input disabled value={item?.name}></input>
      <p>
        Cost of Item {index} {index === 1 && <span>*</span>}
      </p>
      <input disabled value={item?.cost}></input>
      <AttendeesSelect
        options={attendees}
        index={index}
        onChange={addAttendeeItem}
        item={item}
      />
    </div>
  );
}
