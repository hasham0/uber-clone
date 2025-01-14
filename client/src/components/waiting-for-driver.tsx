import { Banknote, ChevronDown, MapPinHouse, MapPinned } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import uberCar from "../assets/images/Uber-PNG-Photos.png";

type Props = {
  setWaitingForDriverPanelOpen: Dispatch<SetStateAction<boolean>>;
};

const WaitingForDriver: FC<Props> = ({ setWaitingForDriverPanelOpen }) => {
  return (
    <div>
      <div className="flex justify-center p-3">
        <ChevronDown
          onClick={() => {
            setWaitingForDriverPanelOpen(false);
          }}
          className="absolute top-0 mt-3 w-24 rounded-md bg-gray-200"
          size={35}
        />
      </div>
      <div className="flex flex-col-reverse items-center justify-evenly rounded-lg border-2 bg-gray-300 md:flex-row">
        <img src={uberCar} alt="uber car" width={250} />
        <div className="mt-5 flex flex-col items-center gap-1 text-lg font-semibold">
          <h2 className="text-lg font-medium">Hasham</h2>
          <h4 className="text-xl font-semibold">MP04 AB 1234</h4>
          <p className="text-sm text-gray-600">Auto 800</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5">
        <div className="mt-5 flex w-full flex-col items-center">
          <div className="flex flex-col md:flex-row">
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

export default WaitingForDriver;
