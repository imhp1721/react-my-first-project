import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];
    const user = usersData.find((user) => user.id === id);
    setName(user.name);
    setTitle(user.title);
    setMail(user.mail);
    setImage(user.image);
  }, [id]);

  function updateUser(event) {
    event.preventDefault();

    const userToUpdate = {
      // key/name: value from state
      name: name,
      title: title,
      mail: mail,
      image: image,
    };

    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];
    // map through the users
    const updatedUsers = usersData.map((user) => {
      //if the user id is the same as the id from the params
      if (user.id === id) {
        return { ...user, ...userToUpdate }; // return the user with the updated data
      }
      return user; // return the user without updating
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers)); // save the users state to local storage
    navigate(`/users/${id}`); // navigate to the user detail page
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        <form onSubmit={updateUser}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Type a name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Type a title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="mail">Mail</label>
          <input
            id="mail"
            type="mail"
            value={mail}
            placeholder="Type a mail"
            onChange={(e) => setMail(e.target.value)}
          />
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="url"
            value={image}
            placeholder="Paste image url"
            onChange={(e) => setImage(e.target.value)}
          />
          <label htmlFor="image-preview"></label>
          <img
            id="image-preview"
            src={
              image
                ? image
                : "https://placehold.co/600x400?text=Paste+an+image+URL"
            }
            alt="Choose"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/600x400?text=Error+loading+image")
            }
          />
          <div className="btns">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button>Update</button>
          </div>
        </form>
      </div>
    </section>
  );
}
