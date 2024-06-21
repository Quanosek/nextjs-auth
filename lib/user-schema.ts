import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Nazwa użytkownika jest wymagana"
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "E-mail jest wymagany")
    .email("Niepoprawny adres e-mail"),
  photo: string().optional(),
  password: string({ required_error: "Password is required" })
    .min(1, "Hasło jest wymagane")
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .max(32, "Hasło nie może zawierać więcej niż 32 znaki"),
  passwordConfirm: string({
    required_error: "Please confirm your password",
  }).min(1, "Powtórzenie hasła jest wymagane"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Podane hasła nie są zgodne",
});

export const loginUserSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email or password"),

  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required"
  ),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
