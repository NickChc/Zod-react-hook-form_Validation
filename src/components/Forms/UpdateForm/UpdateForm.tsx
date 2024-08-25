import "@src/components/Forms/Form.scss";
import { TEditValue } from "@src/@types/general";
import { FormInput } from "@src/components/FormInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@src/components/Button";

interface UpdateFormProps {
  editValue: TEditValue;
  callbackFn: () => void;
}

const editSchema = z
  .string()
  .min(1, "The field is required")
  .refine(
    (val) => {
      if (val === "name" && val.toLocaleLowerCase() === val) {
        return false;
      }
      return true;
    },
    {
      path: ["root"],
      message: "Invalid Name",
    }
  )
  .default("Nick");

export function UpdateForm({ editValue, callbackFn }: UpdateFormProps) {
  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors, isSubmitting: loading },
  } = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: { [editValue]: editValue },
  });

  function onSubmit() {
    console.log("SUBMITTED");
    if (loading) return;

    console.log(editValue);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h1>{editValue.toUpperCase()}</h1>
      <FormInput
        name={editValue}
        register={register}
        placeholder={editValue}
        error={errors.root?.message}
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
