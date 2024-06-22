import { object, string, TypeOf } from "zod";

//! database schema values validation

export const registerUserSchema = object({
  username: string()
    .min(1, "Login jest wymagany")
    .max(30, "Login nie może posiadać więcej niż 30 znaków")
    .toLowerCase()
    .regex(/^[^\s]+$/, {
      message: "Login nie może zawierać spacji",
    })
    .regex(/^[a-z0-9._]+$/, {
      message: `Login nie może posiadać innych znaków specjalnych niż "." oraz "_"`,
    })
    .regex(/[a-z]/, {
      message: "Login musi zawierać co najmniej jedną literę",
    }),

  password: string()
    .min(1, "Hasło jest wymagane")
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .max(64, "Hasło nie może posiadać więcej niż 64 znaków")
    .regex(/^\S*$/, "Hasło nie może zawierać spacji")
    .regex(/[a-z]/, "Hasło musi zawierać co najmniej jedną małą literę")
    .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę")
    .regex(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę")
    .regex(/[\W_]/, "Hasło musi posiadać co najmniej jeden znak specjalny"),

  passwordConfirm: string().min(1, "Potwierdzenie hasła jest wymagane"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Podane hasła nie są identyczne",
});

export const loginUserSchema = object({
  username: string().min(1, "Nie podano loginu"),
  password: string().min(1, "Nie podano hasła"),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
