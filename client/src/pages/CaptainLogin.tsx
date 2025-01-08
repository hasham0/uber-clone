import { zodResolver } from "@hookform/resolvers/zod";
import uberDriverLogo from "../assets/images/uberDriverLogo.png";
import { SignInSchema, SignInSchemaTS } from "../lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Props = {};

export default function CaptainLogin({}: Props) {
  const { register, handleSubmit } = useForm<SignInSchemaTS>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchemaTS> = (captainData) => {
    console.log(captainData);
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
          </p>
        </div>
        <div className="mb-10 flex w-full flex-col items-center justify-center gap-1 px-10 py-4">
          <Link
            to="/login"
            className="bg-user w-full rounded-md p-3 text-center text-lg text-white"
          >
            Sign In as User
          </Link>
        </div>
      </div>
    </div>
  );
}
