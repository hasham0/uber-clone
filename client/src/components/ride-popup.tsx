import { Banknote, ChevronDown, MapPinHouse, MapPinned } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import driver from "../assets/images/driver.jpg";

type Props = {
  setRidePopUpPanelOpen: Dispatch<SetStateAction<boolean>>;
  setConfirmRidePopUpPanelOpen: Dispatch<SetStateAction<boolean>>;
};

const RidePopUp: FC<Props> = ({
  setRidePopUpPanelOpen,
  setConfirmRidePopUpPanelOpen,
}) => {
  return (
    <div>
      <div className="flex justify-center p-2">
        <ChevronDown
          onClick={() => {
            setRidePopUpPanelOpen(false);
          }}
          className="absolute top-0 mt-3 w-24 rounded-md bg-gray-200"
          size={35}
        />
      </div>
      <h3 className="relative text-center text-3xl font-bold underline underline-offset-4">
        New Ride is Available
      </h3>
      <div className="my-4 flex items-center justify-between gap-x-10 rounded-md bg-slate-600 p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <img src={driver} className="h-14 w-14 rounded-full object-cover" />
          <div>
            <h3 className="text-xl font-medium">Zain Khan</h3>
            <h4 className="text-xl font-semibold">2.2 KM</h4>
            <p className="text-sm text-gray-600">Away</p>
          </div>
        </div>
        <div className="flex gap-x-3">
          <Banknote size={60} />
          <div>
            <p className="text-xl">Cash</p>
            <h3 className="text-lg font-semibold">193.20</h3>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-col justify-evenly gap-4 rounded-md bg-gray-300/65 p-5 md:flex-row">
        <div className="flex items-center justify-center gap-5 p-2">
          <MapPinHouse size={35} />
          <div>
            <h3 className="text-xl font-semibold">562/11-A</h3>
            <p className="text-sm text-gray-600">Nasir jump,korangi karachi</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 p-2">
          <MapPinned size={35} />
          <div>
            <h3 className="text-xl font-semibold">562/11-A</h3>
            <p className="text-sm text-gray-600">Nasir jump,korangi karachi</p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-around gap-2 md:flex-row">
        <button
          onClick={() => {
            setRidePopUpPanelOpen(false);
            setConfirmRidePopUpPanelOpen(true);
          }}
          className="w-full rounded-lg bg-green-600 p-2 text-lg font-semibold text-white md:w-1/2"
        >
          Accept
        </button>
        <button
          onClick={() => {
            setRidePopUpPanelOpen(false);
          }}
          className="w-full rounded-lg bg-gray-400 p-2 text-lg font-semibold text-white md:w-1/2"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
