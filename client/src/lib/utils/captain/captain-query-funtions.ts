import { SignUpSchemaCaptainTS, SignInSchemaTS } from "../../schema";
import captainQueryUrl from "./captain-query-url";

const captainSignUp = async (data: SignUpSchemaCaptainTS) => {
  const response = await fetch(captainQueryUrl.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const captainLogin = async (data: SignInSchemaTS) => {
  const response = await fetch(captainQueryUrl.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const captainProfile = async () => {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(captainQueryUrl.profile, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const captainLogout = async () => {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(captainQueryUrl.logout, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export { captainSignUp, captainLogin, captainProfile, captainLogout };
