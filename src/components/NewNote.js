import axios from "axios";
import { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewNote = ({ server, token, id, setNewNote }) => {
  const [note, setNote] = useState("");

  //create note in database fuction
  const createNote = async () => {
    try {
      const response = await axios.post(
        `${server}/note/create`,
        {
          content: note,
          affiliate: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setNewNote(false);
    } catch (error) {
      console.log("Erreur lors de la création de la note :", error.data);
    }
  };

  return (
    <section id="notes-add">
      <ReactQuill
        theme="snow"
        value={note}
        onChange={setNote}
        style={{ height: "200px", margin: "0px" }}
      />
      <div style={{ display: "flex", marginTop: "70px", gap: "20px" }}>
        <button
          id="notes-add-buttons"
          onClick={note.length > 1 ? createNote : null}
        >
          Enregistrer
        </button>
        <button id="notes-add-buttons" onClick={() => setNewNote(false)}>
          Annuler
        </button>
      </div>
    </section>
  );
};

export default NewNote;
