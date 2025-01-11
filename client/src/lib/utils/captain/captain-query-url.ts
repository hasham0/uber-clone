import { VITE_BASE_URL } from "../../env";

const captainQueryUrl: { [key: string]: string } = {
  register: `${VITE_BASE_URL}/api/captain/register`,
  login: `${VITE_BASE_URL}/api/captain/login`,
  logout: `${VITE_BASE_URL}/api/captain/logout`,
  profile: `${VITE_BASE_URL}/api/captain/profile`,
  update: `${VITE_BASE_URL}/api/captain/update`,
  delete: `${VITE_BASE_URL}/api/captain/delete`,
};

export default captainQueryUrl;
