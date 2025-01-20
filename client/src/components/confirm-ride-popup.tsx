import { Banknote, ChevronDown, MapPinHouse, MapPinned } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import driver from "../assets/images/driver.jpg";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { OTPSchema, OTPSchemaTS } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  setConfirmRidePopUpPanelOpen: Dispatch<SetStateAction<boolean>>;
};

const ConfirmRidePopUp: FC<Props> = ({ setConfirmRidePopUpPanelOpen }) => {
  const { register, handleSubmit, reset } = useForm<OTPSchemaTS>({
    resolver: zodResolver(OTPSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [VerifyOTP, setVerifyOTP] = useState<boolean>(false);

  const onSubmit: SubmitHandler<{ OTP: number }> = (data) => {
    if (data.OTP === 222) {
      setVerifyOTP(true);
    } else {
      setErrorMessage("invalid OTP");
    }
    reset();
  };
  return (
    <div className="h-full">
      <div className="flex justify-center p-2">
        <ChevronDown
          onClick={() => {
            setConfirmRidePopUpPanelOpen(false);
          }}
          className="absolute top-0 mt-3 w-24 rounded-md bg-gray-200"
          size={35}
        />
      </div>
      <h3 className="relative text-center text-3xl font-bold underline underline-offset-4">
        Confirm your Ride
      </h3>
      <div className="my-4 flex items-center justify-between gap-x-10 rounded-md bg-slate-600 p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <img src={driver} className="h-14 w-14 rounded-full object-cover" />
          <div>
            <h3 className="text-xl font-medium">Zain Khan</h3>
            <h4 className="text-xl font-semibold">2.2 KM</h4>
            <p className="text-sm text-gray-600">Away</p>
          </div>
        </div>{" "}
        <div className="flex gap-x-3">
          <Banknote size={60} />
          <div>
            <p className="text-xl">Cash</p>
            <h3 className="text-lg font-semibold">193.20</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-evenly gap-4 rounded-md bg-gray-300/65 p-5 md:flex-row">
        <div className="flex items-center justify-center gap-5 p-2">
          <MapPinHouse size={35} />
          <div>
            <h3 className="text-xl font-semibold">562/11-A</h3>
            <p className="text-sm text-gray-600">Nasir jump,korangi karachi</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 p-2">
          <MapPinned size={35} />
          <div>
            <h3 className="text-xl font-semibold">562/11-A</h3>
            <p className="text-sm text-gray-600">Nasir jump,korangi karachi</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-5">
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-3 px-10 py-4 capitalize"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="OTP">
                <h3 className="mb-2 text-xl font-semibold">What's your OTP</h3>
              </label>
              <input
                type="number"
                className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-lg placeholder:text-sm"
                placeholder="Enter your OTP"
                {...register("OTP", {
                  valueAsNumber: true,
                })}
              />
            </div>
            <button
              type="submit"
              className="bb rounded-md bg-black p-2 text-white"
            >
              Verify OTP
            </button>
          </form>{" "}
          {errorMessage && (
            <p className="text-center text-lg text-red-600">{errorMessage}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 p-2 md:flex-row">
          {VerifyOTP ? (
            <Link
              className="w-full rounded-md bg-green-600 p-4 text-center text-xl text-white"
              to={"/captain-riding"}
            >
              Confirm
            </Link>
          ) : (
            <button className="w-full rounded-md bg-gray-600 p-4 text-center text-xl text-white">
              wait...
            </button>
          )}

          <button
            onClick={() => {
              setConfirmRidePopUpPanelOpen(false);
            }}
            className="w-full rounded-md bg-red-600 p-4 text-xl text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
