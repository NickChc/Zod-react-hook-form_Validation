import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-(0[1-9]|[12]\d|3[01])$/;

export const passwordSchema = z
  .string()
  .min(1, "Enter password")
  .min(6, "Password must contain at least 6 letters")
  .regex(/[0-9]/, "Password must include number/s")
  .regex(
    /^(?=.*[!@#$%^&*]).*/,
    "Must include a special character: !, @, #, $, %, ^, &, *"
  );

export const birthdaySchema = z
  .string()
  .min(1, "Enter your birth date")
  .regex(dateRegex, "Invalid date format (yyyy-mm-dd)");

export const nameSchema = z
  .string()
  .min(1, "Enter name")
  .min(3, "Name must include at least 3 letters")
  .regex(/^[A-Z]/, "Name must start with an uppercase letter");

interface DateInFutureRefineProps {
  birthday?: string;
  date?: string;
}

export function dateInFutureRefine({
  date,
  birthday,
}: DateInFutureRefineProps) {
  const theDateString = birthday || date || "";

  const theDate = new Date(theDateString);
  const currDate = new Date();

  currDate.setHours(0, 0, 0, 0);

  return theDate < currDate;
}
