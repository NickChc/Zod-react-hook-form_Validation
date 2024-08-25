import "@src/views/ProfilePage/ProfilePage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER } from "@src/config/storageKeys";
import { UserData } from "@src/components/UserData";
import { Modal } from "@src/components/Modal";
import { TEditValue } from "@src/@types/general";
import { useGlboalProvider } from "@src/providers/GlobalProvider";

export function ProfilePage() {
  const [editValue, setEditValue] = useState<null | TEditValue>(null);
  const navigate = useNavigate();

  const { user, setUser } = useGlboalProvider();

  function handleLogout() {
    localStorage.removeItem(USER);

    navigate("/");
  }

  function handleEditValue(value: TEditValue) {
    if (value === editValue) {
      setEditValue(null);
    } else {
      setEditValue(value);
    }
  }

  function closeModal() {
    setEditValue(null);
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
      {user && (
        <div className="main">
          <h2>Hello, {user.name}</h2>

          <hr />

          <UserData user={user} handleEditValue={handleEditValue} />
        </div>
      )}
      <Modal editValue={editValue} closeModal={closeModal} />
    </div>
  );
}
