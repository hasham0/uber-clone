import { ChevronDown, User } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import uberCar from "../assets/images/Uber-PNG-Photos.png";
import uberBike from "../assets/images/Uber-bike.webp";
import uberAuto from "../assets/images/Uber-Auto.webp";

type Props = {
  setVehicalPanelOpen: Dispatch<SetStateAction<boolean>>;
  setConfirmRidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

const VehiclePanel: FC<Props> = ({
  setVehicalPanelOpen,
  setConfirmRidePanelOpen,
}) => {
  return (
    <div>
      <div className="flex justify-center">
        <ChevronDown
          onClick={() => {
            setVehicalPanelOpen(false);
          }}
          className="absolute top-0 mt-3 w-24 rounded-md bg-gray-200"
          size={35}
        />
      </div>
      <h3 className="relative my-3 text-center text-3xl font-bold underline underline-offset-4">
        Chose a Vehicle
      </h3>
      <div
        onClick={() => {
          setVehicalPanelOpen(false);
          setConfirmRidePanelOpen(true);
        }}
        className="mb-3 flex items-center justify-between rounded-xl border-4 bg-gray-200/80 p-3 active:border-black"
      >
        <img src={uberCar} alt="uber car" width={100} className="max-w-fit" />
        <div className="mr-8 flex w-1/2 flex-1 flex-col items-center gap-2 capitalize tracking-tighter">
          <div className="flex items-center gap-2 font-bold">
            <h2 className="text-xl font-bold">UberGo</h2>
            <span className="flex items-end">
              <User />
              <p>4</p>
            </span>
          </div>
          <h5 className="text-sm font-medium">2 mints away</h5>
          <p className="text-base font-medium text-gray-700">
            Affordable, compact rides
          </p>
        </div>
        <div>
          <h2 className="px-3 text-2xl font-bold">199.30</h2>
        </div>
      </div>
      <div
        onClick={() => {
          setVehicalPanelOpen(false);
          setConfirmRidePanelOpen(true);
        }}
        className="mb-3 flex items-center justify-between rounded-xl border-4 bg-gray-200/80 p-3 active:border-black"
      >
        <img src={uberBike} alt="uber bike" width={100} className="max-w-fit" />
        <div className="mr-3 flex w-1/2 flex-1 flex-col items-center gap-2 capitalize tracking-tighter">
          <div className="flex items-center gap-3 font-bold">
            <h2 className="text-xl font-bold">UberBike</h2>
            <span className="flex items-end">
              <User />
              <p>2</p>
            </span>
          </div>
          <h5 className="text-sm font-medium">10 mints away</h5>
          <p className="text-base font-medium text-gray-700">
            Affordable, compact rides
          </p>
        </div>
        <div>
          <h2 className="px-3 text-2xl font-bold">120.30</h2>
        </div>
      </div>
      <div
        onClick={() => {
          setVehicalPanelOpen(false);
          setConfirmRidePanelOpen(true);
        }}
        className="mb-3 flex items-center justify-between rounded-xl border-4 bg-gray-200/80 p-3 active:border-black"
      >
        <img src={uberAuto} alt="uber auto" width={100} className="max-w-fit" />
        <div className="mr-3 flex w-1/2 flex-1 flex-col items-center gap-2 capitalize tracking-tighter">
          <div className="flex items-center gap-3 font-bold">
            <h2 className="text-xl font-bold">UberBike</h2>
            <span className="flex items-end">
              <User />
              <p>3</p>
            </span>
          </div>
          <h5 className="text-sm font-medium">15 mints away</h5>
          <p className="text-base font-medium text-gray-700">
            Affordable, compact rides
          </p>
        </div>
        <div>
          <h2 className="px-3 text-2xl font-bold">150.30</h2>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
