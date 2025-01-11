import { useContext } from "react";
import { UserDataContext } from "../user-context";

export const useUserContextHook = () => {
  const user = useContext(UserDataContext);
  if (user === null) {
    throw new Error(
      "UserContextHook must be used within a UserContextProvider",
    );
  }
  return user;
};
