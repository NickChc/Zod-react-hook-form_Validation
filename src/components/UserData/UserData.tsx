import "@src/components/UserData/UserData.scss";
import { TEditValue, TUser } from "@src/@types/general";

interface UserDataProps {
  user: TUser;
  handleEditValue: (value: TEditValue) => void;
}

export function UserData({ user, handleEditValue }: UserDataProps) {
  return (
    <div className="user-data">
      <div className="pair-wrapper">
        {Object.keys(user).map((key) => {
          if (key === "id") return;
          const k = key as keyof TUser;
          const value = user[k];

          return (
            <h3 key={key} className="pair" onClick={() => handleEditValue(k)}>
              {key.replace("date", "birthday")} -{" "}
              <p>
                {k === "password"
                  ? value.replace(/[\s\S]/g, "*")
                  : k === "birthday"
                  ? value.replace(/-/g, "/")
                  : value}
              </p>
              <i className="material-icons">edit</i>
            </h3>
          );
        })}
      </div>
    </div>
  );
}
