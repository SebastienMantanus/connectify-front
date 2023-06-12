import axios from "axios";
import { useState, useEffect } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditNote = ({ server, token, id, setHoverIndex }) => {
  const [note, setNote] = useState("");

  //useEffect to fetch note content
  useEffect(() => {
    try {
      const fetchNote = async () => {
        const response = await axios.get(`${server}/note/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNote(response.data.content);
      };
      fetchNote();
    } catch (error) {
      console.log("Erreur lors de la récupération de la note :", error.data);
    }
  }, [server, id, token]);

  //edit note in database fuction
  const editNote = async () => {
    try {
      const response = await axios.patch(
        `${server}/note/${id}`,
        {
          content: note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setHoverIndex("");
    } catch (error) {
      console.log("Erreur lors de la modification de la note :", error.data);
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
          onClick={note.length > 1 ? editNote : null}
        >
          Enregistrer
        </button>
        <button id="notes-add-buttons" onClick={() => setHoverIndex("")}>
          Annuler
        </button>
      </div>
    </section>
  );
};

export default EditNote;
