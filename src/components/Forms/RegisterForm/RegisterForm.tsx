import "@src/components/Forms/Form.scss";
import { FormInput } from "@src/components/FormInput";
import { Button } from "@src/components/Button";
import { TRegisterData, useRegister } from "@src/hooks/useRegister/useRegister";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCOUNTS, USER } from "@src/config/storageKeys";

export function RegisterForm() {
  const [prevDate, setPrevDate] = useState("");
  const navigate = useNavigate();

  const {
    clearErrors,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting: loading },
  } = useRegister();

  function onDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: date } = e.target;
    clearErrors("date");

    setPrevDate(date);

    const isRemoving = prevDate.length > date.length;

    if (isRemoving) {
      return;
    }

    if (date.match(/^\d{0,4}(-\d{1,2})?(-\d{1,2})?$/)) {
      if (date.length === 4) {
        setValue("date", date + "-");
        setPrevDate(date + "-");
        return;
      }

      if (date.length === 7) {
        setValue("date", date + "-");
        setPrevDate(date + "-");
        return;
      }

      setValue("date", date);
    } else {
      setValue("date", date.slice(0, -1));
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearErrors(e?.target.name as keyof TRegisterData);
  }

  async function onSubmit(data: TRegisterData) {
    try {
      window.scrollTo({ top: 100, behavior: "smooth" });

      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      const accounts = JSON.parse(localStorage.getItem(ACCOUNTS) || "[]");
      const { name, email, password, date } = data;

      accounts.push({
        name,
        email,
        password,
        birthday: date,
        id: crypto.randomUUID(),
      });

      localStorage.setItem(ACCOUNTS, JSON.stringify(accounts));
      localStorage.setItem(
        USER,
        JSON.stringify({ name, email, password, birthday: date })
      );

      navigate("/profile");
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h1>Register</h1>
      <div className="main">
        <FormInput
          register={register}
          onChange={onChange}
          error={errors.name?.message}
          name="name"
          label="Name:"
        />

        <hr />

        <FormInput
          register={register}
          onChange={onChange}
          error={errors.email?.message}
          name="email"
          label="Email:"
        />

        <hr />

        <FormInput
          onChange={onDateChange}
          error={errors.date?.message}
          register={register}
          name="date"
          label="Birth Date:"
          placeholder="yyyy-mm-dd"
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

        <hr />

        <FormInput
          onChange={onChange}
          error={errors["repeat-password"]?.message}
          register={register}
          name="repeat-password"
          type="password"
          label="Repeat Password:"
        />

        <hr />

        <FormInput
          onChange={onChange}
          type="checkbox"
          name="terms"
          register={register}
          label="Agree to terms"
          error={errors.terms?.message}
        />

        <Button loading={loading} laodingText="Loading..." type="submit">
          Sign Up
        </Button>
        <div className="a">
          <Link to={"/"}>Already have an account?</Link>
        </div>
      </div>
    </form>
  );
}
