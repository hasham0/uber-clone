import { LogOut } from "lucide-react";
import uberMap from "../assets/images/uberMap.gif";
import uberLogo from "../assets/images/uberLogo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/captain-details";
import RidePopUp from "../components/ride-popup";
import { useRef, useState } from "react";
import ConfirmRidePopUp from "../components/confirm-ride-popup";

type Props = {};

export default function CaptainHome({}: Props) {
  const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState<boolean>(true);
  const [confirmRidePopUpPanelOpen, setConfirmRidePopUpPanelOpen] =
    useState<boolean>(false);

  const ridePopUpRef = useRef(null);
  const confirmRidePopUpRef = useRef(null);

  useGSAP(() => {
    if (ridePopUpPanelOpen) {
      gsap.to(ridePopUpRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpRef.current, {
        transform: "translateY(100%)",
        overflow: "hidden",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [ridePopUpPanelOpen]);

  useGSAP(() => {
    if (confirmRidePopUpPanelOpen) {
      gsap.to(confirmRidePopUpRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpRef.current, {
        transform: "translateY(100%)",
        overflow: "hidden",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [confirmRidePopUpPanelOpen]);

  return (
    <div className="h-screen">
      <div className="fixed top-0 z-20 flex w-full items-center justify-between p-3">
        <img src={uberLogo} className="w-12 rounded-md bg-white p-1" />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <Link to={"/captain-logout"}>
            <LogOut size={20} className="font-medium" />
          </Link>
        </div>
      </div>
      <div className="h-2/3">
        <img className="h-full w-full object-cover" src={uberMap} />
      </div>
      <div className="h-1/3 p-4">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopUpRef}
        className="fixed bottom-0 z-20 w-full translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen}
        />
      </div>
      <div
        ref={confirmRidePopUpRef}
        className="fixed bottom-0 z-20 h-screen w-full translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen}
        />
      </div>
    </div>
  );
}
