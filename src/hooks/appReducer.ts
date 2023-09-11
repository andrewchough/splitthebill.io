import { Reducer, useReducer } from "react";
import {
  State,
  Action,
  ActionTypes,
  AttendeeProps,
  ItemProps,
} from "../utils/types";

function reducer(state: any, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_EVENT_NAME:
      return { ...state, eventName: action.eventName };
    case ActionTypes.ADD_ATTENDEE:
      let newAttendees = [...state.attendees, action.attendee];
      return { ...state, attendees: newAttendees };
    case ActionTypes.REMOVE_ATTENDEE:
      let filteredAttendees = state.attendees.filter(
        (attendee: AttendeeProps) => attendee.name !== action.attendeeName
      );
      return { ...state, attendees: filteredAttendees };
    case ActionTypes.ADD_ITEM_DETAILS:
    case ActionTypes.EDIT_ITEM_DETAILS: {
      let newItems: ItemProps[] = [];
      if (action.type === ActionTypes.ADD_ITEM_DETAILS) {
        newItems = [...state.items, action.item];
      } else if (action.type === ActionTypes.EDIT_ITEM_DETAILS) {
        newItems = [...state.items];
        newItems[action.index] = {
          ...newItems[action.index],
          ...action.data,
        };
      }
      const subtotal = newItems.reduce((sum, item) => sum + item.cost, 0);
      const total = subtotal + state.tax + state.tip;
      return {
        ...state,
        items: newItems,
        subtotal,
        total,
      };
    }
    case ActionTypes.SET_TAX:
    case ActionTypes.SET_TIP: {
      const newTax = action.type === ActionTypes.SET_TAX ? action.tax : state.tax;
      const newTip = action.type === ActionTypes.SET_TIP ? action.tip : state.tip;
      const total = state.subtotal + newTax + newTip;
      return {
        ...state,
        tax: newTax,
        tip: newTip,
        total,
      };
    }

    case ActionTypes.ADD_ATTENDEE_ITEM:
      return {
        ...state,
        attendees: state.attendees.map((attendee: AttendeeProps) => {
          // Remove the item from any attendee who currently has it
          const itemsWithoutTarget = attendee.items.filter(
            (item) => item.index !== action.item.index
          );

          // If this is the attendee we want to assign the item to
          if (attendee.name === action.attendeeName) {
            return {
              ...attendee,
              items: [...itemsWithoutTarget, action.item],
            };
          }

          // If not the target attendee, just return their items without the target
          return {
            ...attendee,
            items: itemsWithoutTarget,
          };
        }),
      };
    default:
      return state;
  }
}

export const useAppReducer = () => {
  const initialState: State = {
    eventName: "",
    attendees: [],
    items: [],
    tax: 0,
    tip: 0,
    subtotal: 0,
    total: 0,
  };
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  const setEventName = (eventName: string) => {
    dispatch({ type: ActionTypes.SET_EVENT_NAME, eventName });
  };

  const addAttendee = (attendee: AttendeeProps) => {
    dispatch({ type: ActionTypes.ADD_ATTENDEE, attendee });
  };

  const removeAttendee = (attendeeName: string) => {
    dispatch({ type: ActionTypes.REMOVE_ATTENDEE, attendeeName });
  };

  const addItemDetails = (item: Partial<ItemProps>) => {
    dispatch({ type: ActionTypes.ADD_ITEM_DETAILS, item });
  };

  const editItemDetails = (index: number, data: Partial<ItemProps>) => {
    dispatch({ type: ActionTypes.EDIT_ITEM_DETAILS, data, index });
  };

  const setTip = (tip: number) => {
    dispatch({ type: ActionTypes.SET_TIP, tip });
  };

  const setTax = (tax: number) => {
    dispatch({ type: ActionTypes.SET_TAX, tax });
  };

  const addAttendeeItem = (attendeeName: string, item: ItemProps) => {
    dispatch({ type: ActionTypes.ADD_ATTENDEE_ITEM, attendeeName, item });
  };

  return {
    eventName: state.eventName,
    attendees: state.attendees,
    items: state.items,
    subtotal: state.subtotal,
    total: state.total,
    setEventName,
    addAttendee,
    removeAttendee,
    addItemDetails,
    editItemDetails,
    setTip,
    setTax,
    addAttendeeItem,
    dispatch,
  };
};
