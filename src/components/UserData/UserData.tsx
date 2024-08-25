import "@src/components/UserData/UserData.scss";
import { TRegisterData as TUser } from "@src/hooks/useRegister/useRegister";

interface UserDataProps {
  user: TUser;
}

export function UserData({ user }: UserDataProps) {
  return (
    <div className="user-data">
      <div className="pair-wrapper">
        {Object.keys(user).map((key) => {
          const k = key as keyof TUser;
          if (k === "repeat-password" || k === "terms") return;

          return (
            <h3 key={key} className="pair">
              {key.replace("date", "birthday")} - {user[k]}
              <i className="material-icons">edit</i>
            </h3>
          );
        })}
      </div>
    </div>
  );
}
