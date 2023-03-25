import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Newcontact = ({ token }) => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [website, SetWebsite] = useState("");
  const [contact, SetContact] = useState("");
  const [description, SetDescription] = useState("");
  const [telephone, SetTelephone] = useState("");
  const [error, SetError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name && email && website && description && telephone && contact) {
      try {
        const response = await axios.post(
          "http://localhost:3000/affiliates/create",
          {
            name: name,
            email: email,
            website: website,
            description: description,
            contact: contact,
            telephone: telephone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        navigate("/");
      } catch (error) {
        SetError(error);
      }
    } else {
      SetError(
        "Merci de remplir tous les champs pour créer un nouveau contact"
      );
    }
  };

  return (
    <div className="flex-center">
      <div className="home-container font">
        <h1>Nouveau contact</h1>
        <form
          className="forms-style margin-left margin-botton"
          onSubmit={handleSubmit}
        >
          <label>
            Nom de l'entreprise :
            <input
              type="text"
              placeholder="Ma jolie boîte dans la praîrie"
              value={name}
              onChange={(event) => {
                SetName(event.target.value);
              }}
            />
          </label>
          <label>
            Nom et prénom du contact :
            <input
              type="text"
              placeholder="John Doe"
              value={contact}
              onChange={(event) => {
                SetContact(event.target.value);
              }}
            />
          </label>
          <label>
            Site Internet :
            <input
              type="text"
              placeholder="www.majoulieboite.com"
              value={website}
              onChange={(event) => {
                SetWebsite(event.target.value);
              }}
            />
          </label>
          <label>
            Téléphone de contact :
            <input
              type="text"
              placeholder="06 51 44 78 98"
              value={telephone}
              onChange={(event) => {
                SetTelephone(event.target.value);
              }}
            />
          </label>
          <label>
            Quelques mots sur l'activité :
            <textarea
              type="text"
              placeholder="Description de l'activité"
              value={description}
              onChange={(event) => {
                SetDescription(event.target.value);
              }}
            />
          </label>
          <label>
            Adresse email de contact :
            <input
              type="text"
              placeholder="johndoe@masuperentreprise.com"
              value={email}
              onChange={(event) => {
                SetEmail(event.target.value);
              }}
            />
          </label>
          <div className="display-buttons">
            <button>Créer le nouveau contact</button>
            <div
              onClick={() => {
                navigate("/");
              }}
            >
              Annuler
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Newcontact;