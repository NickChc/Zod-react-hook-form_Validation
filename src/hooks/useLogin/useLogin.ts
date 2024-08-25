import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@src/schemas/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Enter email").email("Invalid email format"),
  password: passwordSchema,
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
