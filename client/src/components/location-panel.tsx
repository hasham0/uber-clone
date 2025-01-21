import { MapPin } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { LocationSuggestionsResponse } from "../types";

type Props = {
  setPickup: Dispatch<SetStateAction<string | null>>;
  setDestination: Dispatch<SetStateAction<string | null>>;
  suggestions: LocationSuggestionsResponse;
  activeField: null | string;
};

const LocationPanel: FC<Props> = ({
  suggestions,
  activeField,
  setDestination,
  setPickup,
}) => {
  interface Suggestion {
    description: string;
  }

  const handleSuggestionsClick = (suggestion: Suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
  };

  return (
    <div className="p-2">
      {/* sample data */}

      {suggestions.map((suggestion, index: number) => (
        <div
          onClick={() => handleSuggestionsClick(suggestion)}
          key={index}
          className="m-2 flex items-center justify-start gap-2 rounded-xl border bg-gray-100/50 p-3 text-base active:border-2 active:border-black"
        >
          <div className="rounded-full bg-[#eee] p-2">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold">{suggestion.description}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationPanel;
