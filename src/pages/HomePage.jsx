import { useState, useEffect } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    getUsers();

    async function getUsers() {
      const data = localStorage.getItem("users");

      let usersData = [];

      if (data) {
        usersData = JSON.parse(data);
        usersData.sort((user1, user2) => user1.name.localeCompare(user2.name));
      } else {
        usersData = await fetchUsers();
      }

      console.log(usersData);
      setUsers(usersData);
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
    );
    const data = await response.json();
    localStorage.setItem("users", JSON.stringify(data));
    return data;
  }

  return (
    <div className="page">
      <section className="grid">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}
