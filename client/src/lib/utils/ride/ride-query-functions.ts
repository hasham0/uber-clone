import rideQueryUrl from "./ride-query-url";

const calculateVehicaleFare = async (pickup: string, destination: string) => {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(
    `${rideQueryUrl.calculateFare}?pickup=${pickup}&destination=${destination}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "omit",
    },
  );
  return response.json();
};

export { calculateVehicaleFare };
