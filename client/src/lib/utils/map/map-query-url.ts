import { VITE_BASE_URL } from "../../env";

const mapQueryUrl: { [key: string]: string } = {
  suggestions: `${VITE_BASE_URL}/api/map/get-suggestions`,
};

export default mapQueryUrl;
