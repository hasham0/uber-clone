import { VITE_BASE_URL } from "../../env";

const rideQueryUrl: { [key: string]: string } = {
  calculateFare: `${VITE_BASE_URL}/api/ride/calculate-fare`,
};

export default rideQueryUrl;
