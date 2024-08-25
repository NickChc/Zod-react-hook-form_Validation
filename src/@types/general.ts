import { TRegisterData } from "@src/hooks/useRegister/useRegister";

type TUserWithoutDate = Omit<
  TRegisterData,
  "repeat-password" | "terms" | "date"
>;

export type TUser = TUserWithoutDate & {
  birthday: string;
  id: string;
};

export type TEditValue = keyof TUser;
