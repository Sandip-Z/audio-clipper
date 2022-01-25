import React, { createContext } from "react";

export const Context = createContext();

const TimeSlotContext = ({ children, value }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default TimeSlotContext;
