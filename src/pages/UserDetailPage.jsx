import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import User from "../components/User";

export default function UpdatePage() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];
    const user = usersData.find((user) => user.id === id);
    console.log(user);
    setUser(user);
  }, [id]);

  return (
    <div id="user-page" className="page">
      <div className="container">
        <h1>{user.name}</h1>
        <User user={user} />
        <div className="btns">
          <button className="btn-cancel">Delete user</button>
          <button>Update user</button>
        </div>
      </div>
    </div>
  );
}
