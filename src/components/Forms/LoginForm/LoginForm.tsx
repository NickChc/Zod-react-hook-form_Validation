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
    .min(6, "Password must be larger than 6 chars")
    .regex(/[0-9]/, "Password must include number"),
});

type TFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting: loading },
  } = useForm<TFormData>({
    resolver: zodResolver(loginSchema),
  });

  function clearError(error: keyof TFormData) {
    clearErrors(error);
  }

  async function onSubmit(data: TFormData) {
    await trigger();

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
          onChange={() => clearError("email")}
          error={errors.email?.message}
          register={register}
          rules={{
            required: "Enter email",
            minLength: {
              value: 5,
              message: "email must be longer than 5 chars",
            },
          }}
          name="email"
          label="Email:"
        />
        <hr />
        <FormInput
          onChange={() => clearError("password")}
          error={errors.password?.message}
          register={register}
          rules={{ required: "Enter password" }}
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
