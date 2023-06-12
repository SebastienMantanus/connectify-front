import axios from "axios";
import { useState, useEffect } from "react";

const Notes = ({ server, token, id }) => {
  console.log("id", id);
  console.log("server", server);
  console.log("token", token);

  const [notes, setNotes] = useState("");

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
  }, [server, id]);

  return (
    <div className="notes">
      <h3>Hello Notes</h3>
      {/* Make a .map to display notes */}
      {notes &&
        notes.map((note) => {
          // format date
          const formattedDate = new Date(note.created_at).toLocaleDateString(
            "fr-FR",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          );

          //setup number of days since note creation
          const today = new Date();
          const noteDate = new Date(note.created_at);
          const timeDiff = Math.abs(today.getTime() - noteDate.getTime());
          const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

          // setup numbre of ours since note creation
          const diffHours = Math.ceil(timeDiff / (1000 * 3600));

          return (
            <div key={note.id}>
              {diffDays <= 1 ? (
                <p>Créé il y a {diffHours} heures</p>
              ) : (
                <p>Créé il y a {diffDays} jours</p>
              )}
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </div>
          );
        })}
    </div>
  );
};

export default Notes;
