import { Dispatch, FC, SetStateAction } from "react";
import { Banknote, ChevronDown, MapPinHouse, MapPinned } from "lucide-react";
import { VehicleAndFareTS } from "../types";

type Props = {
  vehicleAndFare: VehicleAndFareTS;
  setConfirmRidePanelOpen: Dispatch<SetStateAction<boolean>>;
  setvehicalFoundPanelOpen: Dispatch<SetStateAction<boolean>>;
};

const ConfirmRide: FC<Props> = ({
  setConfirmRidePanelOpen,
  setvehicalFoundPanelOpen,
  vehicleAndFare,
}) => {
  return (
    <div>
      <div className="flex justify-center p-3">
        <ChevronDown
          onClick={() => {
            setConfirmRidePanelOpen(false);
          }}
          className="absolute top-0 mt-3 w-24 rounded-md bg-gray-200"
          size={35}
        />
      </div>
      <h3 className="relative my-7 mt-2 text-center text-3xl font-bold underline underline-offset-4">
        Confirm your Ride
      </h3>
      <div className="flex flex-col items-center justify-between">
        <img
          src={vehicleAndFare.vehicleImage}
          alt={vehicleAndFare.alternameName}
          width={100}
        />
        <div className="mt-5 w-full">
          <div className="mx-10 mb-4 flex items-center justify-start gap-5 border-b-2 py-4">
            <MapPinHouse size={40} />
            <div>
              <h3 className="text-2xl font-semibold">
                {vehicleAndFare.pickup}
              </h3>
              <p className="text-sm text-gray-600">
                Nasir jump,korangi karachi
              </p>
            </div>
          </div>

          <div className="mx-10 mb-4 flex items-center justify-start gap-5 border-b-2 py-4">
            <MapPinned size={40} />
            <div>
              <h3 className="text-2xl font-semibold">
                {vehicleAndFare.destination}
              </h3>
              <p className="text-sm text-gray-600">
                Nasir jump,korangi karachi
              </p>
            </div>
          </div>
          <div className="mx-10 flex items-center justify-start gap-5 py-4">
            <Banknote size={40} />
            <div>
              <h3 className="text-2xl font-semibold">
                {Math.ceil(vehicleAndFare.fare)}
              </h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setvehicalFoundPanelOpen(true);
            setConfirmRidePanelOpen(false);
          }}
          className="w-full rounded-lg bg-captain p-2 text-lg font-semibold text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
