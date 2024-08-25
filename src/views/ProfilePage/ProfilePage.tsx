import "@src/views/ProfilePage/ProfilePage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TRegisterData as TUser } from "@src/hooks/useRegister/useRegister";
import { USER } from "@src/config/storageKeys";

export function ProfilePage() {
  const [user, setUser] = useState<TUser | null>(null);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(USER);

    navigate("/");
  }

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem(USER) || "null");

    setUser(savedUser);
  }, []);

  return (
    <div className="profile">
      <header>
        <h1>Profile</h1>

        <button onClick={handleLogout}>Log Out</button>
      </header>
      {user && <h2>Hello, {user.name}</h2>}
    </div>
  );
}
