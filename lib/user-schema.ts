import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  username: string({ required_error: "Username is required" })
    .min(1, "Login jest wymagany")
    .max(100, "Login nie może posiadać więcej niż 100 znaków")
    .toLowerCase(),
  password: string({ required_error: "Password is required" })
    .min(1, "Hasło jest wymagane")
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .max(32, "Hasło nie może posiadać więcej niż 32 znaków"),
  passwordConfirm: string({
    required_error: "Password confirm is required",
  }).min(1, "Potwierdzenie hasła jest wymagane"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Podane hasła nie są identyczne",
});

export const loginUserSchema = object({
  username: string({ required_error: "No username provided" }).min(
    1,
    "Nie podano loginu"
  ),
  password: string({ required_error: "No password provided" }).min(
    1,
    "Nie podano hasła"
  ),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
