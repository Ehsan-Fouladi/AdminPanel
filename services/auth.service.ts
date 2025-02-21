import type { LoginData } from "~/models/auth/LoginData";

export const Login = (phoneNumber: string, password: string) => {
  return CustomFetch<LoginData>("/auth/login", {
    method: "POST",
    body: {
      phoneNumber,
      password,
    },
  });
};
