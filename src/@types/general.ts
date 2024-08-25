import { TRegisterData } from "@src/hooks/useRegister/useRegister";

type TUserWithoutDate = Omit<TRegisterData, "repeat-password" | "terms">;

export type TUser = TUserWithoutDate & {
  birthday: string;
};

export type TEditValue = keyof TUser;
