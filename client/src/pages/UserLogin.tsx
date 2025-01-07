import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInSchemaTS } from "../lib/schema";
import { Link } from "react-router-dom";
import uberLogo from "../assets/images/uberLogo.png";

type Props = {};

export default function UserLogin({}: Props) {
  const { register, handleSubmit } = useForm<SignInSchemaTS>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchemaTS> = (data) => console.log(data);

  return (
    <div className="">
      <img className="ml-6 mt-3 w-14 text-white" src={uberLogo} />
      <div className="flex h-screen flex-col items-center justify-between gap-4 p-7">
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-1 px-10 py-4 capitalize"
          >
            <label htmlFor="email">
              <h3 className="mb-2 text-xl font-semibold">What's your email</h3>
            </label>
            <input
              type="email"
              className="mb-7 w-full rounded-md bg-[#eeeeee] px-4 py-2 text-lg placeholder:text-sm"
              placeholder="email"
              {...register("email")}
            />

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
            <button
              className="w-full rounded-md border-2 border-black bg-black p-1 text-lg capitalize text-white"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="mt-1 flex justify-center gap-1">
            New here?
            <Link to={"/signup"} className="text-blue-700">
              Create your account
            </Link>
          </p>
        </div>
        <div className="mb-10 flex w-full flex-col items-center justify-center gap-1 px-10 py-4">
          <Link
            to="/signup"
            className="w-full rounded-md bg-[#10b461] p-3 text-center text-lg text-white"
          >
            Sign In as Captain
          </Link>
        </div>
      </div>
    </div>
  );
}
