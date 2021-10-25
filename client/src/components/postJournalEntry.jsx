import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function PostJournalEntry() {
  /* Hooks */
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState();
  const [userName, setUserName] = useState();
  const [title, setTitle] = useState();
  const [journalEntry, setJournalEntry] = useState();
  const [idManual, setIdManual] = useState();
  /* End of Hooks */

  /* Click Handlers */
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleJournalEntry = (e) => {
    setJournalEntry(e.target.value);
  };
  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
  };
  const handleUserId = (e) => {
    setIdManual(e.target.value);
  };
  const dateTime = new Date().toLocaleString("en-GB");

  // Post Data
  const postData = () => {
    const dataToSend = {
      // user_id:idManual,
      first_name: userName,
      title: title,
      journalEntry: journalEntry,
      date_col: dateTime,
      file: file,
    };
    console.log("DataToSend", dataToSend);
    Axios.post("http://localhost:5000/post", dataToSend)
      .then((response) => {
        alert("Journal Entry Submitted!");
        console.log("Post Data", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* End of Click Handlers */

  return (
    <main className="post">
      <section className="post__formContaier">
        <form
          className="post__form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="post__form"
        >
          <label>
            ID
            <textarea
              className="post__formUserName"
              onChange={handleUserId}
            ></textarea>
          </label>
          <label>
            User
            <textarea
              className="post__formUserName"
              onChange={handleUserName}
            ></textarea>
          </label>
          <label>Title:</label>
          <textarea
            className="post__formTitle"
            onChange={handleTitle}
            type="text"
            placeholder="Title"
          />
          <label>Journal Entry:</label>
          <textarea
            className="post__formEntry"
            onChange={handleJournalEntry}
            type="text"
            placeholder="Journal Entry"
          />
          <label className="post__labelUploadImg">Upload Picture</label>
          <input
            className="post__inputUploadImg"
            type="file"
            name="myImage"
            onChange={handleFile}
          />
          <button onClick={postData} className="form__button">
            Submit Entry
          </button>
        </form>
      </section>
      <section className="post__imageContainer">
        {selectedImage && (
          <div>
            <img
              alt="display image"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
      </section>
      <section className="post__linkContainer">
        <Link className="post__link" to="/">
          Back to HomePage
        </Link>
      </section>
    </main>
  );
}
