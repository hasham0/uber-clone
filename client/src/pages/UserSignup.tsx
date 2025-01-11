import uberLogo from "../assets/images/uberLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { SignUpSchema, SignUpSchemaTS } from "../lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { userSignUp } from "../lib/utils/user/user-query-funtions";
import { useUserContextHook } from "../context/hooks/useUserContext";
import toast from "react-hot-toast";

type Props = {};

export default function UserRegister({}: Props) {
  const { setUser } = useUserContextHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpSchemaTS>({
    resolver: zodResolver(SignUpSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation<
    {
      data: SignUpSchemaTS;
      token: string;
      message?: string;
    },
    Error,
    SignUpSchemaTS
  >({
    mutationKey: ["signup"],
    mutationFn: (userData) => userSignUp(userData),
    onSuccess(data) {
      return data;
    },
    onError(error) {
      return error;
    },
  });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SignUpSchemaTS> = async (userData) => {
    try {
      const response = await mutateAsync(userData);
      if (!response.data || !response.token) {
        throw new Error(response.message || "An error occurred");
      }
      const { data, message, token } = response;
      setUser(data);
      localStorage.setItem("token", JSON.stringify(token));
      toast.success(message || "Account created successfully");
      navigate("/login");
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
          <Link to="/">
            <img className="ml-6 mt-3 w-14" src={uberLogo} />
          </Link>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-1 px-10 py-4 capitalize"
          >
            <div className="mb-5 flex flex-col gap-1">
              <label htmlFor="firstName">
                <h3 className="mb-2 text-base font-semibold">
                  What's your name
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
              </div>{" "}
            </div>

            <div className="mb-5 flex flex-col gap-1">
              <label htmlFor="email">
                <h3 className="mb-2 text-base font-semibold">
                  What's your email
                </h3>
              </label>
              <input
                type="email"
                className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                placeholder="email"
                {...register("email")}
              />{" "}
              {errors.email && (
                <p className="my-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
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
                className="w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                placeholder="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="my-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              disabled={isPending}
              className="w-full rounded-md border-2 border-user bg-user p-1 text-base capitalize text-white"
              type="submit"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>{" "}
          <p className="mt-1 flex justify-center gap-1">
            Already have an account ?
            <Link
              to={"/login"}
              className="text-blue-700 underline underline-offset-4"
            >
              Login here
            </Link>
          </p>
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
