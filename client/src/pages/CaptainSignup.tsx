import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchemaCaptain, SignUpSchemaCaptainTS } from "../lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import uberDriverLogo from "../assets/images/uberDriverLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { captainSignUp } from "../lib/utils/captain/captain-query-funtions";
import { useCaptainContextHook } from "../context/hooks/useCaptainContext";
import toast from "react-hot-toast";

type Props = {};

export default function CaptainRegister({}: Props) {
  const { setCaptain } = useCaptainContextHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpSchemaCaptainTS>({
    resolver: zodResolver(SignUpSchemaCaptain),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation<
    {
      data: SignUpSchemaCaptainTS;
      token: string;
      message?: string;
    },
    Error,
    SignUpSchemaCaptainTS
  >({
    mutationKey: ["captainsignup"],
    mutationFn: (captainData) => captainSignUp(captainData),
    onSuccess(data) {
      return data;
    },
    onError(error) {
      return error;
    },
  });

  const onSubmit: SubmitHandler<SignUpSchemaCaptainTS> = async (
    captainData,
  ) => {
    try {
      const response = await mutateAsync(captainData);
      if (!response.data || !response.token) {
        throw new Error(response.message || "An error occurred");
      }
      const { data, message, token } = response;
      setCaptain(data);
      localStorage.setItem("token", JSON.stringify(token));
      toast.success(message || "Captain Account created successfully");
      navigate("/captain-login");
      reset();
    } catch (error) {
      const err = error instanceof Error ? error.message : "An error occurred";
      setErrorMessage(err);
    }
  };

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-between gap-4 p-7">
        <div className="flex w-full flex-col items-center justify-center gap-1 px-10 py-4">
          <Link to="/">
            <img className="ml-6 mt-3 w-14" src={uberDriverLogo} />
          </Link>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-1 px-10 py-4 capitalize"
          >
            <div className="mb-3 flex flex-col gap-1">
              <label htmlFor="firstName">
                <h3 className="mb-2 text-base font-semibold">
                  What's our Captain's name
                </h3>
              </label>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex w-full flex-col flex-wrap gap-1">
                  <input
                    type="text"
                    id="firstName"
                    className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                    placeholder="first name"
                    {...register("fullname.firstname")}
                  />
                  {errors.fullname?.firstname && (
                    <p className="text-sm text-red-600">
                      {errors.fullname.firstname.message}
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-col flex-wrap gap-1">
                  <input
                    type="text"
                    id="lastName"
                    className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                    placeholder="last name"
                    {...register("fullname.lastname")}
                  />
                  {errors.fullname?.lastname && (
                    <p className="text-sm text-red-600">
                      {errors.fullname.lastname.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-1">
              <label htmlFor="email">
                <h3 className="mb-2 text-base font-semibold">
                  What's your Captain's email
                </h3>
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                placeholder="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email?.message}</p>
              )}
            </div>

            <div className="mb-5 flex flex-col gap-1">
              <label htmlFor="password">
                <h3 className="mb-2 text-base font-semibold">
                  What's your password
                </h3>
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                placeholder="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* <div className="mb-5 flex flex-col gap-1">
              <label htmlFor="socketId">
                <h3 className="mb-2 text-base font-semibold">
                  Socket ID (optional)
                </h3>
              </label>
              <input
                type="text"
                id="socketId"
                className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                placeholder="socket ID"
                {...register("soketId")}
              />
            </div> */}

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="mb-5 flex flex-col gap-1">
                <label htmlFor="vehicleColor">
                  <h3 className="mb-2 text-base font-semibold">
                    Vehicle Color
                  </h3>
                </label>
                <input
                  type="text"
                  id="vehicleColor"
                  className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                  placeholder="color"
                  {...register("vehicle.color")}
                />
                {errors.vehicle?.color && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle?.color.message}
                  </p>
                )}
              </div>
              <div className="mb-5 flex flex-col gap-1">
                <label htmlFor="vehiclePlate">
                  <h3 className="mb-2 text-base font-semibold">
                    Vehicle Plate
                  </h3>
                </label>
                <input
                  type="text"
                  id="vehiclePlate"
                  className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                  placeholder="plate"
                  {...register("vehicle.plate")}
                />
                {errors.vehicle?.plate && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle?.plate.message}
                  </p>
                )}
              </div>
              <div className="mb-5 flex flex-col gap-1">
                <label htmlFor="vehicleCapacity">
                  <h3 className="mb-2 text-base font-semibold">
                    Vehicle Capacity
                  </h3>
                </label>
                <input
                  type="number"
                  min={1}
                  max={4}
                  id="vehicleCapacity"
                  className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                  placeholder="capacity"
                  {...register("vehicle.capacity", {
                    valueAsNumber: true,
                  })}
                />
                {errors.vehicle?.capacity && (
                  <p className="text-sm text-red-600">
                    {errors.vehicle?.capacity.message}
                  </p>
                )}
              </div>
              <div className="mb-5 flex flex-col gap-1">
                <label htmlFor="vehicleType">
                  <h3 className="mb-2 text-base font-semibold">Vehicle Type</h3>
                </label>
                <select
                  id="vehicleType"
                  className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                  {...register("vehicle.vehicleType")}
                >
                  <option value="" defaultValue={"motorcycle"} disabled>
                    Select vehicle type
                  </option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              {errors.vehicle?.vehicleType && (
                <p className="text-sm text-red-600">
                  {errors.vehicle.vehicleType?.message}
                </p>
              )}
            </div>
            <button
              className="w-full rounded-md border-2 border-captain bg-captain p-1 text-base capitalize text-white"
              type="submit"
            >
              {isPending
                ? "Create Account For Captain..."
                : "Create Account For Captain"}
            </button>
          </form>
          <p className="mt-1 flex justify-center gap-1">
            Already have a Captain account ?
            <Link
              to={"/captain-login"}
              className="text-blue-700 underline underline-offset-4"
            >
              Captain Login
            </Link>
          </p>{" "}
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
        <div className="mb-10 flex w-full flex-col items-center justify-center gap-1 px-10 py-4">
          <p className="text-sm leading-tight">
            By proceding, you consent to get calls, Whatsapp or SMS messages,
            including bg automated means, from Uber and its affiliates to the
            number you provide, for informational and marketing purposes.
            Message and data rates may apply. You also agree to Uber's Privacy
            Policy and Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
}
