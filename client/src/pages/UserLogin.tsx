import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInSchemaTS, SignUpSchemaTS } from "../lib/schema";
import { Link, useNavigate } from "react-router-dom";
import uberLogo from "../assets/images/uberLogo.png";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../lib/utils/user/user-query-funtions";
import { useUserContextHook } from "../context/hooks/useUserContext";

type Props = {};

export default function UserLogin({}: Props) {
  const { setUser } = useUserContextHook();

  const { register, handleSubmit, reset } = useForm<SignInSchemaTS>({
    resolver: zodResolver(SignInSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation<
    {
      data: SignUpSchemaTS;
      token: string;
      message?: string;
    },
    Error,
    SignInSchemaTS
  >({
    mutationKey: ["signin"],
    mutationFn: (userData) => userLogin(userData),
    onSuccess(data) {
      return data;
    },
    onError(error) {
      return error;
    },
  });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SignInSchemaTS> = async (userData) => {
    try {
      const response = await mutateAsync(userData);
      if (!response.data || !response.token) {
        throw new Error(response.message || "An error occurred");
      }
      const { data, token } = response;
      setUser(data);
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/home");
      reset();
    } catch (error) {
      const err = error instanceof Error ? error.message : "An error occurred";
      setErrorMessage(err);
    }
  };

  return (
    <div>
      <div className="flex h-screen w-full flex-col items-center justify-between gap-4 p-7">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Link to="/">
            <img className="ml-6 mt-3 w-14" src={uberLogo} />
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
            New here?
            <Link
              to={"/signup"}
              className="text-blue-700 underline underline-offset-4"
            >
              Create your account
            </Link>
          </p>{" "}
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
        <div className="mb-10 flex w-full flex-col items-center justify-center gap-1 px-10 py-4">
          <Link
            to="/captain-login"
            className="w-full rounded-md bg-captain p-3 text-center text-lg text-white"
          >
            Sign In as Captain
          </Link>
        </div>
      </div>
    </div>
  );
}
