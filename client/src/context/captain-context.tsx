import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { SignUpSchemaCaptainTS } from "../lib/schema";

type Props = {
  children: ReactNode;
};

type CaptainContextTS = {
  captain: SignUpSchemaCaptainTS;
  setCaptain: Dispatch<SetStateAction<SignUpSchemaCaptainTS>>;
  updateCaptain: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const CaptainDataContext = createContext<CaptainContextTS | null>(null);

export default function CaptainContext({ children }: Props) {
  const [captain, setCaptain] = useState<SignUpSchemaCaptainTS>({
    fullname: { firstname: "", lastname: "" },
    email: "",
    password: "",
    soketId: "",
    status: "inactive",
    location: { lat: 0, lng: 0 },
    vehicle: {
      capacity: 1,
      vehicleType: "motorcycle",
      color: "",
      plate: "",
    },
  });

  const updateCaptain = () => {};
  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, updateCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
}
