import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";

import React, { createContext, useContext, useState, useEffect } from "react";
import useInterval from "hooks/useInterval";

const gameContext = createContext();

export const GameProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [luckyNumber, setLuckyNumber] = useState(-1);
  const [gameOn, setGameOn] = useState(false);

  useInterval(() => randomNumber(), 100);
  const randomNumber = async () => {
    if (gameOn) {
      setLuckyNumber(Math.floor(Math.random() * 99));
    }
  };
  return (
    <gameContext.Provider
      value={{
        gameOn,
        setGameOn,
        luckyNumber,
        setLuckyNumber,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export const useGame = () => useContext(gameContext);
