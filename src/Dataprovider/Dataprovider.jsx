import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "../Utility/reducer";

export const Datacontent = createContext();

export const Dataprovider = ({ children }) => {
  return (
    <Datacontent.Provider value={useReducer(reducer, initialState)}>
      {children}
    </Datacontent.Provider>
  );
};
