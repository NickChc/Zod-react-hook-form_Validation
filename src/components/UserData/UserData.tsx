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
          const k = key as keyof TUser;

          return (
            <h3 key={key} className="pair" onClick={() => handleEditValue(k)}>
              {key.replace("date", "birthday")} - {user[k]}
              <i className="material-icons">edit</i>
            </h3>
          );
        })}
      </div>
    </div>
  );
}
