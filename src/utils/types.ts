export enum ActionTypes {
  SET_EVENT_NAME = "SET_EVENT_NAME",
  ADD_ATTENDEE = "ADD_ATTENDEE",
  REMOVE_ATTENDEE = "REMOVE_ATTENDEE",
  ADD_ITEM_DETAILS = "ADD_ITEM_DETAILS",
  EDIT_ITEM_DETAILS = "EDIT_ITEM_DETAILS",
  ADD_ATTENDEE_ITEM = "ADD_ATTENDEE_ITEM",
  SET_TAX = "SET_TAX",
  SET_TIP = "SET_TIP",
  SET_FRONTER = "SET_FRONTER",
}

export interface AttendeeProps {
  name: string;
  items: ItemProps[];
  isFronter: boolean;
  total: number;
}

export interface ItemProps {
  index: number;
  name: string;
  cost: number;
}

interface SetEventNameAction {
  type: ActionTypes.SET_EVENT_NAME;
  eventName: string;
}

interface AddAttendeeAction {
  type: ActionTypes.ADD_ATTENDEE;
  attendee: AttendeeProps;
}

interface RemoveAttendeeAction {
  type: ActionTypes.REMOVE_ATTENDEE;
  attendeeName: string;
}

interface AddItemDetailsAction {
  type: ActionTypes.ADD_ITEM_DETAILS;
  item: Partial<ItemProps>;
}

interface EditItemDetailsAction {
  type: ActionTypes.EDIT_ITEM_DETAILS;
  index: number;
  data: Partial<ItemProps>;
}

interface SetTaxAction {
  type: ActionTypes.SET_TAX;
  tax: number;
}

interface SetTipAction {
  type: ActionTypes.SET_TIP;
  tip: number;
}

interface AddAttendeeItemAction {
  type: ActionTypes.ADD_ATTENDEE_ITEM;
  attendeeName: string;
  item: ItemProps;
}

interface SetFronter {
  type: ActionTypes.SET_FRONTER;
  attendeeName: string;
}

export interface State {
  eventName: string;
  attendees: AttendeeProps[];
  items: ItemProps[];
  tax: number;
  tip: number;
  subtotal: number;
  total: number;
  fronter: string;
}

export type Action =
  | SetEventNameAction
  | AddAttendeeAction
  | RemoveAttendeeAction
  | AddItemDetailsAction
  | EditItemDetailsAction
  | AddAttendeeItemAction
  | SetTaxAction
  | SetTipAction
  | SetFronter;
