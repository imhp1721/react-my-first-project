import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  function handleCancel() {
    navigate(-1);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      id: Date.now().toString(),
      name: name,
      title: title,
      mail: mail,
      image: image,
    };

    console.log(newUser);

    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];

    usersData.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersData));

    navigate("/");
  }

  return (
    <div className="page">
      <section className="container">
        <h1>Create new user</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Type a name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Type a title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="mail">Mail</label>
          <input
            id="mail"
            type="mail"
            placeholder="Type a mail"
            onChange={(e) => setMail(e.target.value)}
          />
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="url"
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
            <button>Create</button>
          </div>
        </form>
      </section>
    </div>
  );
}
