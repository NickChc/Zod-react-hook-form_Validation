import "@src/components/Forms/Form.scss";
import { useForm } from "react-hook-form";
import { FormInput } from "@src/components/FormInput";
import { Button } from "@src/components/Button";

interface TFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting: loading },
  } = useForm<TFormData>();

  async function onSubmit(data: TFormData) {
    if (loading) return;

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
        <FormInput register={register} name="email" label="Email:" />
        <hr />
        <FormInput
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
