import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Enter email").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Enter password")
    .min(6, "Password must contain at least 6 letters")
    .regex(/[0-9]/, "Password must include number/s")
    .regex(
      /^(?=.*[!@#$%^&*]).*/,
      "Must include a special character: !, @, #, $, %, ^, &, *"
    ),
});

export type TFormData = z.infer<typeof loginSchema>;

export function useLogin() {
  const form = useForm<TFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  return { ...form, loginSchema };
}
