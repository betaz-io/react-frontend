import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";

import React, { createContext, useContext, useState, useEffect } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [ticketId, setTicketId] = useState(0);
  return (
    <TicketContext.Provider
      value={{
        ticketId,
        setTicketId,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => useContext(TicketContext);
