import { Type } from "./Action.type";

export const initialState = {
  Basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Check if action.item is defined to prevent errors
      if (!action.item || !action.item.id) {
        console.error("Item is undefined or missing 'id' property");
        return state;
      }

      const existingItem = state.Basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        // If the item doesn't exist in the basket, add it with an amount of 1
        return {
          ...state,
          Basket: [...state.Basket, { ...action.item, amount: 1 }],
        };
      } else {
        // If the item exists, update its amount
        const updatedBasket = state.Basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return {
          ...state,
          Basket: updatedBasket,
        };
      }

    case Type.REMOVE_FROM_BASKET:
      // Find the index of the item to remove
      const index = state.Basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.Basket];

      // Fix the condition to check for index >= 0
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // Decrement the amount if it's greater than 1
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // Remove the item if its amount is 1
          newBasket.splice(index, 1);
        }
      } else {
        console.warn(`Item with id ${action.id} not found in the basket`);
      }

      return {
        ...state,
        Basket: newBasket,
      };

    case Type.SET_USER:
    default:
      return { ...state, user: action.user };
  }
};
