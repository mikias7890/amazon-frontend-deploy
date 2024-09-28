import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "../../Utility/reducer";

// Create the context (this is what you'll use in the Signup component)
export const Datacontent = createContext();

// Define the Dataprovider component that provides the context to children
export const Dataprovider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Datacontent.Provider value={[state, dispatch]}>
      {children}
    </Datacontent.Provider>
  );
};
