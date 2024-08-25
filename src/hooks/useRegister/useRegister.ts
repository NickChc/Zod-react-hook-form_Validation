import { zodResolver } from "@hookform/resolvers/zod";
import { birthdaySchema, nameSchema, passwordSchema } from "@src/schemas/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

const month_31 = [1, 3, 5, 7, 8, 10, 12];
const month_30 = [4, 6, 9, 11];

const registerSchema = z
  .object({
    email: z.string().min(1, "Enter email").email("Invalid email"),
    name: nameSchema,
    password: passwordSchema,
    "repeat-password": z.string().min(1, "Please confirm password"),
    date: birthdaySchema,
    terms: z.boolean().refine((val) => val === true, {
      message: "Agree to terms to continue",
    }),
  })
  .refine((data) => data.password === data["repeat-password"], {
    path: ["repeat-password"],
    message: "Passwords don't match",
  })
  .refine(
    ({ date }) => {
      const year = Number(date.split("-")[0]);

      return year >= 1950;
    },
    {
      message: "Year must be later than/equal to 1950",
      path: ["date"],
    }
  )
  .refine(
    ({ date }) => {
      const month = Number(date.split("-")[1]);

      return 12 >= month && month >= 1;
    },
    {
      message: "Invalid month (1 - 12)",
      path: ["date"],
    }
  )
  .refine(
    ({ date }) => {
      const [, month, day] = date.split("-").map(Number);

      if (month_31.some((m) => m === month) && day > 31) {
        return false;
      }
      return true;
    },
    {
      path: ["date"],
      message: "Specified month only has 31 days",
    }
  )
  .refine(
    ({ date }) => {
      const [, month, day] = date.split("-").map(Number);

      if (month_30.some((m) => m === month) && day > 30) {
        return false;
      }
      return true;
    },
    {
      path: ["date"],
      message: "Specified month only has 30 days",
    }
  )
  .refine(
    ({ date }) => {
      const [, month, day] = date.split("-").map(Number);

      if (month === 2 && day > 29) {
        return false;
      }

      return true;
    },
    {
      path: ["date"],
      message: "Specified month only has 29 days",
    }
  );

export type TRegisterData = z.infer<typeof registerSchema>;

export function useRegister() {
  const form = useForm<TRegisterData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  return { registerSchema, ...form };
}
