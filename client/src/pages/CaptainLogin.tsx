import { zodResolver } from "@hookform/resolvers/zod";
import uberDriverLogo from "../assets/images/uberDriverLogo.png";
import {
  SignInSchema,
  SignInSchemaTS,
  SignUpSchemaCaptainTS,
} from "../lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { captainLogin } from "../lib/utils/captain/captain-query-funtions";
import toast from "react-hot-toast";
import { useState } from "react";
import { useCaptainContextHook } from "../context/hooks/useCaptainContext";

type Props = {};

export default function CaptainLogin({}: Props) {
  const { register, handleSubmit, reset } = useForm<SignInSchemaTS>({
    resolver: zodResolver(SignInSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setCaptain } = useCaptainContextHook();

  const { mutateAsync, isPending } = useMutation<
    {
      data: SignUpSchemaCaptainTS;
      token: string;
      message?: string;
    },
    Error,
    SignInSchemaTS
  >({
    mutationKey: ["captainslogin"],
    mutationFn: (captainData) => captainLogin(captainData),
    onSuccess(data) {
      return data;
    },
    onError(error) {
      return error;
    },
  });

  const onSubmit: SubmitHandler<SignInSchemaTS> = async (captainData) => {
    try {
      const response = await mutateAsync(captainData);
      if (!response.data || !response.token) {
        throw new Error(response.message || "An error occurred");
      }
      const { data, message, token } = response;
      setCaptain(data);
      localStorage.setItem("token", JSON.stringify(token));
      toast.success(message || "Captain Account login successfully");
      navigate("/captain-home");
      reset();
    } catch (error) {
      const err = error instanceof Error ? error.message : "An error occurred";
      setErrorMessage(err);
    }
  };
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-between gap-4 p-7">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Link to={"/"}>
            <img className="-mb-5 ml-6 mt-3 w-14" src={uberDriverLogo} />
          </Link>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-1 px-10 py-4 capitalize"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email">
                <h3 className="mb-2 text-xl font-semibold">
                  What's your email
                </h3>
              </label>
              <input
                type="email"
                className="mb-7 w-full rounded-md bg-[#eeeeee] px-4 py-2 text-lg placeholder:text-sm"
                placeholder="email"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">
                <h3 className="mb-2 text-xl font-semibold">
                  What's your password
                </h3>
              </label>
              <input
                type="password"
                className="mb-7 w-full rounded-md bg-[#eeeeee] px-4 py-2 text-lg placeholder:text-sm"
                placeholder="password"
                {...register("password")}
              />
            </div>
            <button
              disabled={isPending}
              className="w-full rounded-md border-2 border-black bg-black p-1 text-lg capitalize text-white"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="mt-1 flex justify-center gap-1">
            Join a fleet?
            <Link
              to={"/captain-signup"}
              className="text-blue-700 underline underline-offset-4"
            >
              Register as a Captain
            </Link>
          </p>{" "}
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
        <div className="mb-10 flex w-full flex-col items-center justify-center gap-1 px-10 py-4">
          <Link
            to="/login"
            className="w-full rounded-md bg-user p-3 text-center text-lg text-white"
          >
            Sign In as User
          </Link>
        </div>
      </div>
    </div>
  );
}
