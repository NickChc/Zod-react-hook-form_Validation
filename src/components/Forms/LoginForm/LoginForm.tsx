import "@src/components/Forms/Form.scss";
import { useForm } from "react-hook-form";
import { FormInput } from "@src/components/FormInput";
import { Button } from "@src/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Enter email").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Enter password")
    .min(6, "Password must contain at least 6 letters")
    .regex(/[0-9]/, "Password must include number"),
});

type TFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting: loading },
  } = useForm<TFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearErrors(e?.target.name as keyof TFormData);
  }

  async function onSubmit(data: TFormData) {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    console.log(data);

    try {
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h1>Log In</h1>
      <div className="main">
        <FormInput
          register={register}
          onChange={onChange}
          error={errors.email?.message}
          name="email"
          label="Email:"
        />

        <hr />
        <FormInput
          onChange={onChange}
          error={errors.password?.message}
          register={register}
          name="password"
          type="password"
          label="Password:"
        />

        <Button loading={loading} laodingText="Signing In..." type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
}
