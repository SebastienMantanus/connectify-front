import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

const Contact = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, SetIsLoading] = useState(true);
  const [nameEdition, SetNameEdition] = useState(false);
  const [contactEdition, SetContactEdition] = useState(false);
  const [descriptionEdition, SetDescriptionEdition] = useState(false);
  const [telephoneEdition, SetTelephoneEdition] = useState(false);
  const [mailEdition, SetMailEdition] = useState(false);

  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [description, setDescription] = useState();
  const [telephone, setTelephone] = useState();
  const [email, setEmail] = useState();
  const [website, setWebsite] = useState();
  const [favicon, setFavicon] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://back--connectify--pcsmmwq8bwzd.code.run/affiliates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName(response.data.name);
      setContact(response.data.contact);
      setDescription(response.data.description);
      setEmail(response.data.email);
      setTelephone(response.data.telephone);
      setWebsite(response.data.website);
      setFavicon(response.data.favicon.secure_url);
      SetIsLoading(false);
    };
    fetchData();
  }, [id, token]);

  const contactUpdate = async () => {
    const response = await axios.post(
      `https://back--connectify--pcsmmwq8bwzd.code.run/affiliate/update/${id}`,
      {
        name: name,
        email: email,
        contact: contact,
        website: website,
        description: description,
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
  };

  const contactDelete = async () => {
    await axios.delete(
      `https://back--connectify--pcsmmwq8bwzd.code.run/affiliate/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Contact supprimé");
    navigate("/");
  };

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : token ? (
    <div className="flex-center">
      <div className="home-container font margin-botton">
        <div className="top-bar">
          <h1>Détail du contact</h1>
        </div>

        <div className="contact-container">
          <div>
            {/* NAME */}
            {nameEdition ? (
              <div className="edition-name-option margin-botton">
                <input
                  className="edition-name-option-input"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon="fa-circle-check"
                  style={{ color: "#00a100" }}
                  size="lg"
                  onClick={() => {
                    SetNameEdition(false);
                  }}
                />
              </div>
            ) : (
              <h2
                className="margin-botton"
                onClick={() => {
                  SetNameEdition(true);
                }}
              >
                {name}
              </h2>
            )}

            {/* CONTACT */}

            {contactEdition ? (
              <div className="edition-name-option margin-botton">
                <input
                  className="edition-contact-option"
                  type="text"
                  value={contact}
                  onChange={(event) => {
                    setContact(event.target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon="fa-circle-check"
                  style={{ color: "#00a100" }}
                  size="lg"
                  onClick={() => {
                    SetContactEdition(false);
                  }}
                />
              </div>
            ) : (
              <h3
                onClick={() => {
                  SetContactEdition(true);
                }}
              >
                {contact}
              </h3>
            )}

            {/* DESCRIPTION */}
            {descriptionEdition ? (
              <div className="edition-name-option margin-botton">
                <textarea
                  className="edition-contact-description"
                  type="text"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon="fa-circle-check"
                  style={{ color: "#00a100" }}
                  size="lg"
                  onClick={() => {
                    SetDescriptionEdition(false);
                  }}
                />
              </div>
            ) : (
              <p
                className="margin-botton"
                onClick={() => {
                  SetDescriptionEdition(true);
                }}
              >
                {description}
              </p>
            )}

            {/* TELEPHONE */}

            {telephoneEdition ? (
              <div className="edition-name-option margin-botton">
                <input
                  className="edition-contact-option"
                  type="text"
                  value={telephone}
                  onChange={(event) => {
                    setTelephone(event.target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon="fa-circle-check"
                  style={{ color: "#00a100" }}
                  size="lg"
                  onClick={() => {
                    SetTelephoneEdition(false);
                  }}
                />
              </div>
            ) : (
              <h3
                onClick={() => {
                  SetTelephoneEdition(true);
                }}
              >
                {telephone}
              </h3>
            )}

            {/* EMAIL */}

            {mailEdition ? (
              <div className="edition-name-option margin-botton">
                <input
                  className="edition-contact-option"
                  type="text"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon="fa-circle-check"
                  style={{ color: "#00a100" }}
                  size="lg"
                  onClick={() => {
                    SetMailEdition(false);
                  }}
                />
              </div>
            ) : (
              <h3
                onClick={() => {
                  SetMailEdition(true);
                }}
              >
                {email}
              </h3>
            )}
          </div>
          <img className="favicon" src={favicon} alt="company logo" />
        </div>
        <div className="options-bar">
          <button
            className="update-button normal-button"
            onClick={() => {
              contactUpdate();
            }}
          >
            Sauvegarder et sortir
          </button>
          <button
            className="update-button red-button"
            onClick={() => {
              const checkDelete = () => {
                if (
                  window.confirm(
                    "Souhaitez-vous vraiment effacer cette fiche ?"
                  ) === true
                ) {
                  contactDelete();
                } else {
                  alert("on n'efface pas");
                }
              };
              checkDelete();
            }}
          >
            Effacer la fiche
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Contact;
