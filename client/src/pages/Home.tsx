import { zodResolver } from "@hookform/resolvers/zod";
import uberLogo from "../assets/images/uberLogo.png";
import uberMap from "../assets/images/uberMap.gif";
import { PickUpSchema, PickUpSchemaTS } from "../lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown, User } from "lucide-react";
import LocationPanel from "../components/location-panel";
import uberCar from "../assets/images/Uber-PNG-Photos.png";
import uberBike from "../assets/images/Uber-bike.webp";
import uberAuto from "../assets/images/Uber-Auto.webp";

type Props = {};

export default function Home({}: Props) {
  const [panelOpen, setPanelOpen] = useState<boolean>(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehiclePanelCloseRef = useRef(null);

  const [vehiclePanelOpen, setVehicalPanelOpen] = useState<boolean>(false);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "80%",
        display: "block",
        opacity: 1,
        overflow: "visible",
        duration: 0.5,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.5,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        display: "none", // Ensure it's fully hidden
        opacity: 0,
        overflow: "hidden", // Prevent scroll
        duration: 0.5,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.5,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        y: 0, // Moves the panel to its original position
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      const timeline = gsap.timeline(); // Use a timeline to sequence animations
      timeline
        .to(vehiclePanelRef.current, {
          y: "100%", // Moves the panel off-screen
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
        .to(
          vehiclePanelCloseRef.current,
          {
            y: "100%",
            borderColor: "red", // Change border color instead of animating `border`
            duration: 0.5,
            ease: "power2.in",
          },
          "<", // Play this animation simultaneously with the previous one
        );
    }
  }, [vehiclePanelOpen]);

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
      <img
        src={uberLogo}
        className="absolute left-5 top-5 w-16 rounded-md bg-white p-1"
      />
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
                id="firstName"
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
                id="lastName"
                className="w-full rounded-lg bg-[#eeeeee] px-8 py-3 text-base placeholder:text-sm"
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
        className="fixed bottom-0 z-20 w-full translate-y-full bg-white px-3 py-8"
      >
        <ChevronDown
          onClick={() => {
            console.log("first");
            setVehicalPanelOpen(false);
          }}
          className="bb top-0 w-full text-gray-600"
          size={35}
        />
        <h3 className="relative mb-5 text-center text-3xl font-bold underline underline-offset-4">
          Chose a Vehicle
        </h3>
        <div className="mb-3 flex items-center justify-evenly rounded-xl border-4 bg-gray-200/80 p-3 active:border-black">
          <img src={uberCar} alt="uber car" width={200} className="max-w-fit" />
          <div className="mr-8 flex w-1/2 flex-1 flex-col items-center gap-2 capitalize tracking-tighter">
            <div className="flex items-center gap-2 font-bold">
              <h2 className="text-xl font-bold">UberGo</h2>
              <span className="flex items-end">
                <User />
                <p>4</p>
              </span>
            </div>
            <h5 className="text-sm font-medium">2 mints away</h5>
            <p className="text-base font-medium text-gray-700">
              Affordable, compact rides
            </p>
          </div>
          <div>
            <h2 className="px-3 text-2xl font-bold">199.30</h2>
          </div>
        </div>
        <div className="mb-3 flex items-center justify-evenly rounded-xl border-4 bg-gray-200/80 p-3 active:border-black">
          <img
            src={uberBike}
            alt="uber bike"
            width={150}
            className="max-w-fit"
          />
          <div className="flex w-1/2 flex-1 flex-col items-center gap-2 capitalize tracking-tighter">
            <div className="flex items-center gap-2 font-bold">
              <h2 className="text-xl font-bold">UberBike</h2>
              <span className="flex items-end">
                <User />
                <p>2</p>
              </span>
            </div>
            <h5 className="text-sm font-medium">5 mints away</h5>
            <p className="text-base font-medium text-gray-700">
              Affordable motorcycle, compact rides
            </p>
          </div>
          <div className="">
            <h2 className="px-3 text-2xl font-bold">120.30</h2>
          </div>
        </div>
        <div className="mb-3 flex items-center justify-around rounded-xl border-4 bg-gray-200/80 p-3 active:border-black">
          <img
            src={uberAuto}
            alt="uber bike"
            width={150}
            className="max-w-fit"
          />
          <div className="flex w-1/2 flex-1 flex-col items-center gap-2 capitalize tracking-tighter">
            <div className="flex items-center gap-2 font-bold">
              <h2 className="text-xl font-bold">UberAuto</h2>
              <span className="flex items-end">
                <User />
                <p>3</p>
              </span>
            </div>
            <h5 className="text-sm font-medium">15 mints away</h5>
            <p className="text-base font-medium text-gray-700">
              Affordable auto, compact rides
            </p>
          </div>
          <div className="">
            <h2 className="px-3 text-2xl font-bold">140.30</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
