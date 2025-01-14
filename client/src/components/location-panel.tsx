import { MapPin } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { locations } from "../data";

type Props = {
  setVehicalPanelOpen: Dispatch<SetStateAction<boolean>>;
  setPanelOpen: Dispatch<SetStateAction<boolean>>;
};

const LocationPanel: FC<Props> = ({ setVehicalPanelOpen, setPanelOpen }) => {
  return (
    <div className="p-2">
      {/* sample data */}

      {locations.map((location, index: number) => (
        <div
          onClick={() => {
            setVehicalPanelOpen(true);
            setPanelOpen(false);
          }}
          key={index}
          className="m-6 flex items-center justify-start gap-4 rounded-xl border bg-gray-100/50 p-3 text-lg active:border-2 active:border-black"
        >
          <div className="rounded-full bg-[#eee] p-2">
            <MapPin size={25} />
          </div>
          <div>
            <h4 className="text-xl font-semibold">{location}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationPanel;
