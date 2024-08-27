import { zodResolver } from "@hookform/resolvers/zod";
import { TEditValue } from "@src/@types/general";
import { month_30, month_31 } from "@src/mocks/general";
import { useGlboalProvider } from "@src/providers/GlobalProvider";
import {
  birthdaySchema,
  dateInFutureRefine,
  nameSchema,
  passwordSchema,
} from "@src/schemas/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useUpdate(editValue: TEditValue) {
  const [prevDate, setPrevDate] = useState("");
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
      editSchema = z
        .object({
          [editValue]: birthdaySchema,
        })
        .refine(
          ({ birthday }) => {
            const year = Number(birthday.split("-")[0]);

            return year >= 1950;
          },
          {
            message: "Year must be later than/equal to 1950",
            path: ["date"],
          }
        )
        .refine(
          ({ birthday }) => {
            const month = Number(birthday.split("-")[1]);

            return 12 >= month && month >= 1;
          },
          {
            message: "Invalid month (1 - 12)",
            path: ["date"],
          }
        )
        .refine(
          ({ birthday }) => {
            const [, month, day] = birthday.split("-").map(Number);

            if (month_31.some((m) => m === month) && day > 31) {
              return false;
            }
            return true;
          },
          {
            path: ["date"],
            message: "Specified month only has 31 days",
          }
        )
        .refine(
          ({ birthday }) => {
            const [, month, day] = birthday.split("-").map(Number);

            if (month_30.some((m) => m === month) && day > 30) {
              return false;
            }
            return true;
          },
          {
            path: ["date"],
            message: "Specified month only has 30 days",
          }
        )
        .refine(
          ({ birthday }) => {
            const [, month, day] = birthday.split("-").map(Number);

            if (month === 2 && day > 29) {
              return false;
            }

            return true;
          },
          {
            path: ["date"],
            message: "Specified month only has 29 days",
          }
        )
        .refine(dateInFutureRefine, {
          path: ["birthday"],
          message: "This date is in future",
        });
      break;
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

  function onDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: date } = e.target;
    form.clearErrors("birthday");

    setPrevDate(date);

    const isRemoving = prevDate.length > date.length;

    if (isRemoving) {
      if (date.length === 4 || date.length === 7) {
        form.setValue("birthday", date.slice(0, -1));
      }

      return;
    }

    if (date.match(/^\d{0,4}(-\d{1,2})?(-\d{1,2})?$/)) {
      if (date.length === 4) {
        form.setValue("birthday", date + "-");
        setPrevDate(date + "-");

        return;
      }

      if (date.length === 7) {
        form.setValue("birthday", date + "-");
        setPrevDate(date + "-");
        return;
      }

      form.setValue("birthday", date);
    } else {
      form.setValue("birthday", date.slice(0, -1));
    }
  }

  return { ...form, editSchema, onDateChange };
}
