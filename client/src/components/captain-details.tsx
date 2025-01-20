import { BookCheck, Clock2 } from "lucide-react";
import driver from "../assets/images/driver.jpg";

type Props = {};

export default function CaptainDetails({}: Props) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img src={driver} className="h-10 w-10 rounded-full object-cover" />
          <h3 className="text-lg font-medium">Zain Khan</h3>
        </div>
        <div className="">
          <h4 className="text-xl font-semibold">294.20</h4>
          <p className="text-end text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex items-start justify-between rounded-md border-2 bg-gray-300/30 p-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <Clock2 className="text-2xl" />
          <h5>10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <Clock2 className="text-2xl" />
          <h5>10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <BookCheck className="text-2xl" />
          <h5>10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
}
