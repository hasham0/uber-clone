import { Banknote, ChevronDown, MapPinHouse, MapPinned } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import uberCar from "../assets/images/Uber-PNG-Photos.png";

type Props = { setvehicalFoundPanelOpen: Dispatch<SetStateAction<boolean>> };

const LookingForDriver: FC<Props> = ({ setvehicalFoundPanelOpen }) => {
  return (
    <div>
      <div className="flex justify-center p-3">
        <ChevronDown
          onClick={() => {
            setvehicalFoundPanelOpen(false);
          }}
          className="absolute top-0 mt-3 w-24 rounded-md bg-gray-200"
          size={35}
        />
      </div>
      <h3 className="relative mt-2 text-center text-3xl font-bold underline underline-offset-4">
        Looking for a driver
      </h3>
      <div className="flex flex-col items-center justify-between gap-5">
        <img src={uberCar} alt="uber car" width={300} />
        <div className="mt-5 w-full">
          <div className="mx-10 mb-4 flex items-center justify-start gap-5 border-b-2 py-4">
            <MapPinHouse size={40} />
            <div>
              <h3 className="text-2xl font-semibold">562/11-A</h3>
              <p className="text-sm text-gray-600">
                Nasir jump,korangi karachi
              </p>
            </div>
          </div>
          <div className="mx-10 mb-4 flex items-center justify-start gap-5 border-b-2 py-4">
            <MapPinned size={40} />
            <div>
              <h3 className="text-2xl font-semibold">562/11-A</h3>
              <p className="text-sm text-gray-600">
                Nasir jump,korangi karachi
              </p>
            </div>
          </div>
          <div className="mx-10 flex items-center justify-start gap-5 py-4">
            <Banknote size={40} />
            <div>
              <h3 className="text-2xl font-semibold">193.20</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
