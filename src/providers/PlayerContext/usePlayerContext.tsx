"use client";

import { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

export const usePlayerContext = () => {
  const ctx = useContext(PlayerContext);

  if (!ctx) {
    throw Error("error with PlayerContext");
  }

  return ctx;
};
