import { Link } from "react-router-dom";
import uberMap from "../assets/images/uberMap.gif";
import uberLogo from "../assets/images/uberLogo.png";
import { LogOut } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import FinishRide from "../components/finish-ride";
type Props = {};

export default function CaptainRiding({}: Props) {
  const [finishRidePopUpPanelOpen, setFinishRidePopUpPanelOpen] =
    useState<boolean>(false);

  const finishRidePopUpRef = useRef(null);

  useGSAP(() => {
    if (finishRidePopUpPanelOpen) {
      gsap.to(finishRidePopUpRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePopUpRef.current, {
        transform: "translateY(100%)",
        overflow: "hidden",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [finishRidePopUpPanelOpen]);

  return (
    <div>
      <div className="h-screen">
        <div className="fixed top-0 z-20 flex w-full items-center justify-between p-3">
          <img src={uberLogo} className="w-12 rounded-md bg-white p-1" />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <Link to={"/captain-logout"}>
              <LogOut size={20} className="font-medium" />
            </Link>
          </div>
        </div>
        <div className="h-4/5">
          <img className="h-full w-full object-cover" src={uberMap} />
        </div>
        <div className="flex h-1/5 flex-col items-center gap-12 bg-yellow-400">
          {/* <div className="relative flex w-full justify-center p-1">
            <ChevronDown
              onClick={() => {
                //         setFinishRidePopUpPanelOpen(false);
              }}
              className="absolute w-24 rounded-md bg-gray-200"
              size={35}
            />
          </div> */}
          <div className="my-6 flex w-full flex-col items-center gap-4 px-3">
            <h4 className="text-2xl font-semibold">5 KM away</h4>
            <button
              onClick={() => setFinishRidePopUpPanelOpen(true)}
              className="w-full rounded-md bg-green-600 p-4 text-xl text-white"
            >
              Complete Ride
            </button>
          </div>
        </div>{" "}
        <div
          ref={finishRidePopUpRef}
          className="fixed bottom-0 z-20 h-screen w-full translate-y-full bg-white px-3 py-10 pt-12"
        >
          <FinishRide
            setFinishRidePopUpPanelOpen={setFinishRidePopUpPanelOpen}
          />
        </div>
      </div>
    </div>
  );
}
