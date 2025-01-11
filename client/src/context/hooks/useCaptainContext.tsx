import { useContext } from "react";
import { CaptainDataContext } from "../captain-context";

export const useCaptainContextHook = () => {
  const captain = useContext(CaptainDataContext);
  if (captain === null) {
    throw new Error(
      "CaptainContextHook must be used within a CaptainContextProvider",
    );
  }
  return captain;
};
