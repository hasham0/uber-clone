import uberLogo from "../assets/images/uberLogo.png";

import { Link } from "react-router-dom";
import { SignUpSchema, SignUpSchemaTS } from "../lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

export default function UserRegister({}: Props) {
  const { register, handleSubmit } = useForm<SignUpSchemaTS>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchemaTS> = (userData) => {
    console.log(userData);
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
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-1/2 rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                  placeholder="first name"
                  {...register("fullname.firstname")}
                />
                <input
                  type="text"
                  className="w-1/2 rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                  placeholder="last name"
                  {...register("fullname.lastname")}
                />
              </div>
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
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">
                <h3 className="mb-2 text-base font-semibold">
                  What's your password
                </h3>
              </label>
              <input
                type="password"
                className="mb-7 w-full rounded-md bg-[#eeeeee] px-4 py-2 text-base placeholder:text-sm"
                placeholder="password"
                {...register("password")}
              />
            </div>
            <button
              className="border-user bg-user w-full rounded-md border-2 p-1 text-base capitalize text-white"
              type="submit"
            >
              Create Account
            </button>
          </form>
          <p className="mt-1 flex justify-center gap-1">
            Already have an account ?
            <Link
              to={"/login"}
              className="text-blue-700 underline underline-offset-4"
            >
              Login here
            </Link>
          </p>
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
