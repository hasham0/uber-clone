import { SignInSchemaTS, SignUpSchemaTS } from "../../schema";
import userQueryUrl from "./user-query-url";

const userSignUp = async (data: SignUpSchemaTS) => {
  const response = await fetch(userQueryUrl.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const userLogin = async (data: SignInSchemaTS) => {
  const response = await fetch(userQueryUrl.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const userProfile = async () => {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(userQueryUrl.profile, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "omit",
  });
  return response.json();
};
const userLogout = async () => {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(userQueryUrl.logout, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "omit",
  });
  return response.json();
};

export { userSignUp, userLogin, userProfile, userLogout };
