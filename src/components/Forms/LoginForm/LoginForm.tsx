import "@src/components/Forms/Form.scss";
import { FormInput } from "@src/components/FormInput";
import { Button } from "@src/components/Button";
import { Link } from "react-router-dom";
import { TFormData, useLogin } from "@src/hooks/useLogin/useLogin";

export function LoginForm() {
  const {
    clearErrors,
    handleSubmit,
    register,
    formState: { errors, isSubmitting: loading },
  } = useLogin();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearErrors(e?.target.name as keyof TFormData);
  }

  async function onSubmit(data: TFormData) {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      console.log(data);
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
        <div className="a">
          <Link to={"/sign-up"}>Don't have an account yet?</Link>
        </div>
      </div>
    </form>
  );
}
