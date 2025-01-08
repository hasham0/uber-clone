import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { SignUpSchemaTS } from "../lib/schema";

type Props = {
  children: ReactNode;
};

type userContextTS = {
  user: SignUpSchemaTS;
  setUser: Dispatch<SetStateAction<SignUpSchemaTS>>;
};

const UserDataContext = createContext<userContextTS | null>(null);

export default function UserContext({ children }: Props) {
  const [user, setUser] = useState<SignUpSchemaTS>({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
}

export const UserContextHook = () => {
  const user = useContext(UserDataContext);
  if (user === null) {
    throw new Error(
      "UserContextHook must be used within a UserContextProvider",
    );
  }
  return user;
};
