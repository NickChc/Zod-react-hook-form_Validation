import { zodResolver } from "@hookform/resolvers/zod";
import { TEditValue } from "@src/@types/general";
import { useGlboalProvider } from "@src/providers/GlobalProvider";
import { nameSchema, passwordSchema } from "@src/schemas/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useUpdate(editValue: TEditValue) {
  const { user } = useGlboalProvider();

  let editSchema;

  switch (editValue) {
    case "email":
      editSchema = z.object({
        [editValue]: z.string().min(1, "Empty field").email("Invalid email"),
      });
      break;
    case "name":
      editSchema = z.object({
        [editValue]: nameSchema,
      });
      break;
    case "password":
      editSchema = z.object({
        [editValue]: passwordSchema,
      });
      break;
    case "birthday":
    default:
      editSchema = z.object({
        [editValue]: z.string().min(1, `Enter ${editValue} first`),
      });
      break;
  }

  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(editSchema),
    defaultValues: { [editValue]: user?.[editValue] },
  });

  return { ...form, editSchema };
}
