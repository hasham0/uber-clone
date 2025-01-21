import { FC } from "react";
import { User } from "lucide-react";

type VehicleOptionProps = {
  name: string;
  image: string;
  capacity: number;
  timeAway: string;
  fare: number;
  onClick: (name: string) => void;
};

const VehicleOption: FC<VehicleOptionProps> = ({
  name,
  image,
  capacity,
  timeAway,
  fare,
  onClick,
}) => (
  <div
    onClick={() => onClick(name)}
    className="mb-3 flex items-center justify-between rounded-xl border-4 bg-gray-200/80 p-3 active:border-black"
  >
    <img src={image} alt={name} width={100} className="max-w-fit" />
    <div className="mr-3 flex w-1/2 flex-1 flex-col items-center gap-2 capitalize tracking-tighter">
      <div className="flex items-center gap-3 font-bold">
        <h2 className="text-xl font-bold">{name}</h2>
        <span className="flex items-end">
          <User />
          <p>{capacity}</p>
        </span>
      </div>
      <h5 className="text-sm font-medium">{timeAway} away</h5>
      <p className="text-base font-medium text-gray-700">
        Affordable, compact rides
      </p>
    </div>
    <div>
      <h2 className="px-3 text-2xl font-bold">{Math.ceil(fare)}</h2>
    </div>
  </div>
);

export default VehicleOption;
