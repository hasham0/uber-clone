import { VITE_BASE_URL } from "../../env";

const userQueryUrl: { [key: string]: string } = {
  register: `${VITE_BASE_URL}/api/user/register`,
  login: `${VITE_BASE_URL}/api/user/login`,
  logout: `${VITE_BASE_URL}/api/user/logout`,
  profile: `${VITE_BASE_URL}/api/user/profile`,
  update: `${VITE_BASE_URL}/api/user/update`,
  delete: `${VITE_BASE_URL}/api/user/delete`,
};

export default userQueryUrl;
