import "@src/components/Forms/Form.scss";
import { TEditValue, TUser } from "@src/@types/general";
import { FormInput } from "@src/components/FormInput";
import { Button } from "@src/components/Button";
import { useGlboalProvider } from "@src/providers/GlobalProvider";
import { ACCOUNTS, USER } from "@src/config/storageKeys";
import { useUpdate } from "@src/hooks/useUpdate";

interface UpdateFormProps {
  editValue: TEditValue;
  callbackFn: () => void;
}

export function UpdateForm({ editValue, callbackFn }: UpdateFormProps) {
  const { user, setUser } = useGlboalProvider();
  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors, isSubmitting: loading },
  } = useUpdate(editValue);

  async function onSubmit(data: { [editValue: string]: string | undefined }) {
    if (loading) return;

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      const savedAccs: TUser[] = JSON.parse(
        localStorage.getItem(ACCOUNTS) || "[]"
      );

      const newUser = {
        ...user,
        [editValue]: data[editValue],
      };

      const newAccs = savedAccs.map((acc) => {
        if (acc.id === newUser.id) {
          return newUser;
        }
        return acc;
      });

      localStorage.setItem(ACCOUNTS, JSON.stringify(newAccs));
      localStorage.setItem(USER, JSON.stringify(newUser));

      setUser(newUser as TUser);

      callbackFn();
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h1>{editValue.toUpperCase()}</h1>
      <FormInput
        type={editValue === "password" ? "password" : "text"}
        name={editValue}
        register={register}
        placeholder={editValue}
        error={errors[editValue]?.message}
        onChange={(e) => clearErrors(e.target.name)}
      />

      <div className="buttons">
        <Button loading={loading} type="submit" laodingText="Editing...">
          Edit
        </Button>
        <Button variation="secondary" type="button" onClick={callbackFn}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
