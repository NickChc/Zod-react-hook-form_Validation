import "@src/components/Forms/Form.scss";
import { FormInput } from "@src/components/FormInput";
import { Button } from "@src/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { TFormData, useLogin } from "@src/hooks/useLogin/useLogin";
import { ACCOUNTS, USER } from "@src/config/storageKeys";
import { TRegisterData } from "@src/hooks/useRegister/useRegister";

export function LoginForm() {
  const navigate = useNavigate();

  const {
    clearErrors,
    handleSubmit,
    register,
    setError,
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

      const accounts: TRegisterData[] = JSON.parse(
        localStorage.getItem(ACCOUNTS) || "[]"
      );

      const theUser = accounts.find((acc) => {
        if (acc.email === data.email && acc.password === data.password) {
          return acc;
        }
      });

      if (theUser) {
        console.log("user exists");
        localStorage.setItem(USER, JSON.stringify(theUser));
        navigate("/profile");
        return;
      }

      setError("root", { message: "Wrong email or password" });
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

        {errors.root && <div className="error">{errors.root.message}</div>}

        <div className="a">
          <Link to={"/sign-up"}>Don't have an account yet?</Link>
        </div>
      </div>
    </form>
  );
}
