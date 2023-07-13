import axios from "axios";
import { useState, useEffect } from "react";

import NewNote from "./NewNote";
import EditNote from "./EditNote";

const Notes = ({ server, token, id }) => {
  const [notes, setNotes] = useState("");
  const [newNote, setNewNote] = useState(false);

  //refresh notes when a note is deleted
  const [refresh, setRefresh] = useState(false);

  // hover index to display edit window
  const [hoverIndex, setHoverIndex] = useState(null);

  //fuction to delete a note
  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`${server}/note/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefresh(!refresh);
      console.log(response.data);
    } catch (error) {
      console.log("Erreur lors de la suppression de la note :", error.data);
    }
  };

  useEffect(() => {
    try {
      const fetchNotes = async () => {
        const response = await axios.get(`${server}/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(response.data);
      };
      fetchNotes();
    } catch (error) {
      console.log("Erreur lors de la récupération des notes :", error.data);
    }
  }, [server, newNote, refresh, hoverIndex, id, token]);

  return (
    <div>
      {newNote && (
        <NewNote
          server={server}
          token={token}
          id={id}
          setNewNote={setNewNote}
        />
      )}
      <div className="notes">
        <div>
          {notes.length > 0 ? (
            <h2 style={{ fontSize: "20px" }}>{notes.length} notes</h2>
          ) : (
            <h2 style={{ fontSize: "20px" }}>Aucune note</h2>
          )}
          {!newNote && (
            <button onClick={() => setNewNote(!newNote)}>
              Ajouter une note
            </button>
          )}
        </div>

        {notes &&
          notes.map((note) => {
            // format date
            // const formattedDate = new Date(note.created_at).toLocaleDateString(
            //   "fr-FR",
            //   {
            //     day: "numeric",
            //     month: "long",
            //     year: "numeric",
            //   }
            // );

            //setup number of days since note creation
            const today = new Date();
            const noteDate = new Date(note.created_at);
            const timeDiff = Math.abs(today.getTime() - noteDate.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            // setup numbre of ours since note creation
            const diffHours = Math.ceil(timeDiff / (1000 * 3600));

            return (
              <div key={note._id}>
                {diffDays <= 1 ? (
                  <p>
                    Créé il y a {diffHours}h par {note.responsable.name}
                  </p>
                ) : (
                  <p>
                    Créé il y a {diffDays} jours par {note.responsable.name}
                  </p>
                )}

                {hoverIndex === note._id ? (
                  <EditNote
                    server={server}
                    token={token}
                    id={note._id}
                    setHoverIndex={setHoverIndex}
                  />
                ) : (
                  <div
                    onClick={() => setHoverIndex(note._id)}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                )}
                {!hoverIndex && (
                  <button
                    className="delete-note-button"
                    onClick={() => deleteNote(note._id)}
                  >
                    Supprimer cette note
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
