import { ChevronDown } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import uberCar from "../assets/images/Uber-PNG-Photos.png";
import uberBike from "../assets/images/Uber-bike.webp";
import uberAuto from "../assets/images/Uber-Auto.webp";
import VehicleOption from "./vehicle-options";
import { VehicaleFareTS } from "../types";

type Props = {
  setVehicalPanelOpen: Dispatch<SetStateAction<boolean>>;
  setConfirmRidePanelOpen: Dispatch<SetStateAction<boolean>>;
  vehicaleFare: VehicaleFareTS;
  isLoading: boolean;
  createRide: (vehicleName: string) => void;
};

const VehiclePanel: FC<Props> = ({
  setVehicalPanelOpen,
  setConfirmRidePanelOpen,
  isLoading,
  vehicaleFare,
  createRide,
}) => {
  const handleVehicleSelection = (name: string) => {
    createRide(name);
    setVehicalPanelOpen(false);
    setConfirmRidePanelOpen(true);
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex min-h-40 items-center justify-center text-center text-3xl font-bold text-black">
          <p>Loading fares...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <ChevronDown
              onClick={() => setVehicalPanelOpen(false)}
              className="absolute top-0 mt-3 w-24 rounded-md bg-gray-200"
              size={35}
            />
          </div>

          <h3 className="relative my-3 text-center text-3xl font-bold underline underline-offset-4">
            Choose a Vehicle
          </h3>
          <VehicleOption
            name="UberGo"
            image={uberCar}
            capacity={4}
            timeAway="2 mins"
            fare={vehicaleFare.car}
            onClick={handleVehicleSelection}
          />
          <VehicleOption
            name="UberBike"
            image={uberBike}
            capacity={2}
            timeAway="10 mins"
            fare={vehicaleFare.motorcycle}
            onClick={handleVehicleSelection}
          />
          <VehicleOption
            name="UberAuto"
            image={uberAuto}
            capacity={3}
            timeAway="15 mins"
            fare={vehicaleFare.auto}
            onClick={handleVehicleSelection}
          />
        </>
      )}
    </div>
  );
};

export default VehiclePanel;
