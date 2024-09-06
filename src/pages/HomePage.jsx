import { useState, useEffect } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  const [searchTerm, setSearchTerm] = useState(""); //state to handle the search term

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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <form className="grid-filter" role="search">
        <label htmlFor="">
          Search by name{""}
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </section>
    </div>
  );
}
