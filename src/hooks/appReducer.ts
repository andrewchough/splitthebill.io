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
      return {
        ...state,
        attendees: [
          ...state.attendees,
          { ...action.attendee, total: 0, items: [] },
        ],
      };
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
    case ActionTypes.SET_TIP:
    case ActionTypes.SET_TAX:
      const newTax =
        action.type === ActionTypes.SET_TAX ? action.tax : state.tax;
      const newTip =
        action.type === ActionTypes.SET_TIP ? action.tip : state.tip;
      const newTotal = state.subtotal + newTax + newTip;

      const equalShareOfTaxAndTip = (newTax + newTip) / state.attendees.length;

      return {
        ...state,
        tax: newTax,
        tip: newTip,
        total: newTotal,
        attendees: state.attendees.map((attendee: AttendeeProps) => ({
          ...attendee,
          total: parseFloat(
            (attendee.total + equalShareOfTaxAndTip).toFixed(2)
          ),
        })),
      };
    case ActionTypes.ADD_ATTENDEE_ITEM:
      // Identify if there's a previous owner of the item.
      const previousOwner = state.attendees.find(
        (attendee: AttendeeProps) =>
          attendee.items.some((item) => item.name === action.item.name) // Assuming items are unique by name
      );

      // Map through the attendees and apply the necessary transformations.
      return {
        ...state,
        attendees: state.attendees.map((attendee: AttendeeProps) => {
          // For the attendee you want to assign the item to:
          if (attendee.name === action.attendeeName) {
            // Check if they already have the item, if not, add it.
            const hasItem = attendee.items.some(
              (item) => item.name === action.item.name
            );
            if (!hasItem) {
              return {
                ...attendee,
                items: [...attendee.items, action.item],
                total: parseFloat(
                  (attendee.total + action.item.cost).toFixed(2)
                ),
              };
            }
          }

          // If the attendee was the previous owner of the item, remove it from their list.
          if (previousOwner && attendee.name === previousOwner.name) {
            const filteredItems = attendee.items.filter(
              (item) => item.name !== action.item.name
            );
            return {
              ...attendee,
              items: filteredItems,
              total: parseFloat((attendee.total - action.item.cost).toFixed(2)),
            };
          }

          // For everyone else, no changes are needed.
          return attendee;
        }),
      };

    case ActionTypes.SET_FRONTER: {
      return {
        ...state,
        attendees: state.attendees.map((attendee: AttendeeProps) => {
          if (attendee.name === action.attendeeName) {
            return {
              ...attendee,
              isFronter: true,
            };
          }
          return {
            ...attendee,
            isFronter: false,
          };
        }),
      };
    }
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

  const setFronter = (attendeeName: string) => {
    dispatch({ type: ActionTypes.SET_FRONTER, attendeeName });
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
    setFronter,
    dispatch,
  };
};
