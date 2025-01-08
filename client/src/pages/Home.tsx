import { Link } from "react-router-dom";
import uberLogo from "../assets/images/uberLogo.png";
type Props = {};

export default function Home({}: Props) {
  return (
    <div>
      <div className="relative flex h-screen w-full flex-col justify-between bg-red-400 bg-trafficLight bg-[length:780px_900px] bg-top bg-no-repeat pt-8">
        <img className="ml-8 w-14 text-white" src={uberLogo} />
        <div className="bg-white p-4 pb-7 text-center md:text-left">
          <h2 className="text-xl font-bold md:text-3xl">
            Get Started With Uber
          </h2>
          <Link
            to={"/login"}
            className="mt-5 flex w-full items-center justify-center rounded bg-black py-3 text-lg text-white"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
