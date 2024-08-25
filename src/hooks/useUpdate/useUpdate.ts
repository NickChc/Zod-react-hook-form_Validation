import { zodResolver } from "@hookform/resolvers/zod";
import { TEditValue } from "@src/@types/general";
import { useGlboalProvider } from "@src/providers/GlobalProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useUpdate(editValue: TEditValue) {
  const { user } = useGlboalProvider();

  const editSchema = z.object({
    [editValue]: z.string().min(1, `Enter ${editValue} first`),
  });

  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(editSchema),
    defaultValues: { [editValue]: user?.[editValue] },
  });

  return { ...form, editSchema };
}
