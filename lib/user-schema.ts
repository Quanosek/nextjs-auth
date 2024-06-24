import { object, string, TypeOf } from "zod";

// password validation rules

function passwordValidation(requiredMessage: string) {
  return string()
    .min(1, requiredMessage)
    .min(8, "Hasło musi posiadać co najmniej 8 znaków")
    .max(30, "Hasło nie może posiadać więcej niż 30 znaków")
    .regex(/[a-z]/, "Hasło musi zawierać co najmniej jedną literę")
    .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę")
    .regex(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę")
    .regex(
      /[^a-zA-Z0-9]/,
      "Hasło musi zawierać co najmniej jeden znak specjalny"
    );
}

function passwordConfirmValidation() {
  return string().min(1, "Potwierdzenie hasła jest wymagane");
}

// schema for login user form

export const loginUserSchema = object({
  username: string().min(1, "Nie podano loginu"),
  password: string().min(1, "Nie podano hasła"),
});

// schema for changing user password form

export const ChangePasswordSchema = object({
  currentPassword: string().min(1, "Obecne hasło jest wymagane"),

  newPassword: passwordValidation("Nowe hasło jest wymagane"),
  newPasswordConfirm: passwordConfirmValidation(),
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
  path: ["newPasswordConfirm"],
  message: "Podane hasła nie są identyczne",
});

// schema for registering new user form

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

  password: passwordValidation("Hasło jest wymagane"),
  passwordConfirm: passwordConfirmValidation(),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Podane hasła nie są identyczne",
});

// export types for user input

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
export type ChangePasswordInput = TypeOf<typeof ChangePasswordSchema>;
