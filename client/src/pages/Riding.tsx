import { Banknote, House, MapPinHouse, MapPinned } from "lucide-react";
import uberMap from "../assets/images/uberMap.gif";
import uberCar from "../assets/images/Uber-PNG-Photos.png";
import { Link } from "react-router-dom";

type Props = {};

export default function Riding({}: Props) {
  return (
    <div className="h-screen">
      <Link
        to={"/home"}
        className="fixed right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white"
      >
        <House className="font-medium" />
      </Link>

      <div className="h-1/2">
        <img className="h-full w-full object-cover" src={uberMap} />
      </div>
      <div className="h-1/2">
        <div className="flex flex-col-reverse items-center justify-evenly rounded-lg border-2 bg-gray-100 md:flex-row">
          <img src={uberCar} alt="uber car" width={250} />
          <div className="mt-5 flex flex-col items-center gap-1 text-lg font-semibold">
            <h2 className="text-lg font-medium">Hasham</h2>
            <h4 className="text-xl font-semibold">MP04 AB 1234</h4>
            <p className="text-sm text-gray-600">Auto 800</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="mt-5 flex w-full flex-col items-center justify-center md:flex-row">
            <div className="mx-10 mb-4 flex items-center justify-start gap-5 py-4">
              <MapPinHouse size={40} />
              <div>
                <h3 className="text-2xl font-semibold">562/11-A</h3>
                <p className="text-sm text-gray-600">
                  Nasir jump,korangi karachi
                </p>
              </div>
            </div>
            <div className="mx-10 mb-4 flex items-center justify-start gap-5 py-4">
              <MapPinned size={40} />
              <div>
                <h3 className="text-2xl font-semibold">562/11-A</h3>
                <p className="text-sm text-gray-600">
                  Nasir jump,korangi karachi
                </p>
              </div>
            </div>
            <div className="mx-10 flex w-56 items-center justify-between gap-5">
              <Banknote size={40} />
              <div className="mr-20">
                <h3 className="text-2xl font-semibold">193.20</h3>
                <p className="text-sm text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <button
            onClick={() => {
              // setvehicalFoundPanelOpen(true);
              // setConfirmRidePanelOpen(false);
            }}
            className="my-5 w-full rounded-lg bg-blue-600 p-2 text-lg font-semibold text-white"
          >
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
}
