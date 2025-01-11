import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { SignUpSchemaTS } from "../lib/schema";

type Props = {
  children: ReactNode;
};

type UserContextTS = {
  user: SignUpSchemaTS;
  setUser: Dispatch<SetStateAction<SignUpSchemaTS>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext<UserContextTS | null>(null);

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
