import { zodResolver } from "@hookform/resolvers/zod";
import uberLogo from "../assets/images/uberLogo.png";
import uberMap from "../assets/images/uberMap.gif";
import { PickUpSchema, PickUpSchemaTS } from "../lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown, LogOut } from "lucide-react";
import LocationPanel from "../components/location-panel";
import VehiclePanel from "../components/vehicle-panel";
import ConfirmRide from "../components/confrm-ride";
import LookingForDriver from "../components/looking-for-driver";
import WaitingForDriver from "../components/waiting-for-driver";
import { Link } from "react-router-dom";

type Props = {};

export default function Home({}: Props) {
  const [panelOpen, setPanelOpen] = useState<boolean>(false);
  const [vehiclePanelOpen, setVehicalPanelOpen] = useState<boolean>(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] =
    useState<boolean>(false);
  const [vehicalFoundPanelOpen, setvehicalFoundPanelOpen] =
    useState<boolean>(false);
  const [waitingForDriverPanelOpen, setWaitingForDriverPanelOpen] =
    useState<boolean>(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicalFoundPanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        // opacity:1
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
        // opacity:0
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanelOpen]);

  useGSAP(() => {
    if (vehicalFoundPanelOpen) {
      gsap.to(vehicalFoundPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicalFoundPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicalFoundPanelOpen]);

  useGSAP(() => {
    if (waitingForDriverPanelOpen) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriverPanelOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PickUpSchemaTS>({
    resolver: zodResolver(PickUpSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<PickUpSchemaTS> = async (location) => {
    try {
      console.log(location);
    } catch (error) {
      const err = error instanceof Error ? error.message : "An error occurred";
      setErrorMessage(err);
    }
  };
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="fixed top-0 z-20 flex w-full items-center justify-between p-3">
        <img src={uberLogo} className="w-12 rounded-md bg-white p-1" />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <Link to={"/logout"}>
            <LogOut size={20} className="font-medium" />
          </Link>
        </div>
      </div>

      <div className="h-screen w-screen">
        <img className="h-full w-full object-cover" src={uberMap} />
      </div>
      <div className="absolute top-0 flex h-screen w-full flex-col justify-end transition-all duration-500 ease-in-out">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex w-full flex-col gap-3 bg-white p-3 capitalize"
        >
          <ChevronDown
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute right-5 top-5 opacity-0"
            size={30}
          />
          <h4 className="m-2 text-2xl font-bold">Find a trip</h4>
          <div className="relative flex flex-col gap-5">
            <div className="line absolute left-4 top-4 h-20 w-1 rounded-full bg-black"></div>
            <div className="flex w-full flex-col flex-wrap gap-1">
              <input
                type="text"
                id="pickUpLocation"
                required
                className="w-full rounded-lg bg-[#eeeeee] px-8 py-3 text-base placeholder:text-sm"
                onClick={() => setPanelOpen(true)}
                placeholder="Add a pick up location"
                {...register("pickUpLocation")}
              />
              {errors.pickUpLocation && (
                <p className="text-sm text-red-600">
                  {errors.pickUpLocation.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col flex-wrap gap-1">
              <input
                type="text"
                id="dropDestination"
                className="w-full rounded-lg bg-[#eeeeee] px-8 py-3 text-base placeholder:text-sm"
                required
                onClick={() => setPanelOpen(true)}
                placeholder="Enter your destination"
                {...register("dropDestination")}
              />
              {errors.dropDestination && (
                <p className="text-sm text-red-600">
                  {errors.dropDestination.message}
                </p>
              )}
            </div>
          </div>
          <button
            className="my-2 max-w-40 rounded-md border-2 border-captain bg-captain p-2 text-base capitalize text-white"
            type="submit"
          >
            find a rider
          </button>
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
        </form>
        <div ref={panelRef} className={`bg-white`}>
          <LocationPanel
            setVehicalPanelOpen={setVehicalPanelOpen}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 z-20 w-full translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          setVehicalPanelOpen={setVehicalPanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 z-20 w-full translate-y-full bg-white px-3 py-6 pt-10"
      >
        <ConfirmRide
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setvehicalFoundPanelOpen={setvehicalFoundPanelOpen}
        />
      </div>
      <div
        ref={vehicalFoundPanelRef}
        className="fixed bottom-0 z-20 w-full translate-y-full bg-white px-3 py-6 pt-10"
      >
        <LookingForDriver setvehicalFoundPanelOpen={setvehicalFoundPanelOpen} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 z-20 w-full translate-y-full bg-white px-3 py-6 pt-10"
      >
        <WaitingForDriver
          setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen}
        />
      </div>
    </div>
  );
}
