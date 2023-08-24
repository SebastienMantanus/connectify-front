import { Icon } from "@iconify/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateContactForm = ({
  newContact,
  setNewContact,
  server,
  token,
}) => {
  const navigate = useNavigate();

  const [inProgress, setInProgress] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState({});

  // show and hide form sections
  const [showAddress, setShowAddress] = useState(false);
  const [showSize, setShowSize] = useState(false);

  // validate url + phone number
  //form validation functions

  const isValidUrl = (url) => {
    const urlPattern = /^[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    if (!urlPattern.test(url)) {
      return false;
    } else {
      return true;
    }
  };

  // Save contact in database function

  const SaveContact = async () => {
    if (
      newContact.contact_name &&
      newContact.company_name &&
      newContact.company_website
    ) {
      setInProgress(true);

      // Save contact in database
      const response = await axios.post(
        `${server}/affiliate/create/savetodb`,
        {
          contact_name: newContact.contact_name,
          contact_role: newContact.contact_role,
          contact_email: newContact.contact_email,
          contact_phone: newContact.contact_phone,
          company_name: newContact.company_name,
          company_legalform: newContact.company_legalform,
          company_address: newContact.company_address,
          company_zip: newContact.company_zip,
          company_city: newContact.company_city,
          company_size_min: newContact.company_size_min,
          company_size_max: newContact.company_size_max,
          company_capital: newContact.company_capital,
          company_activity: newContact.company_activity,
          company_founded: newContact.company_founded,
          company_registration_number: newContact.company_registration_number,
          company_website: newContact.company_website,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      setInProgress(false);
      navigate(`/contact/${response.data._id}/edit`);
    }
  };

  return (
    <div className="create-contact-container font">
      <div>
        <h1>Nouveau contact</h1>
        {step === 1 ? (
          <form>
            <h2>Information de l'entreprise</h2>
            <h3 style={{ marginTop: "30px" }}>Informations générales</h3>
            <p className="red">{error.company_name_error}</p>
            <input
              type="text"
              style={{ borderLeft: "3px solid #b42f5a" }}
              name="company_name"
              placeholder="Nom de l'entreprise (obligatoire)"
              value={newContact.company_name}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  company_name: e.target.value,
                });
              }}
            />
            <p className="red">{error.company_website_error}</p>
            <input
              type="text"
              style={{ borderLeft: "3px solid #b42f5a" }}
              name="company_website"
              placeholder="Site web (obligatoire)"
              value={newContact.company_website}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  company_website: e.target.value,
                });
              }}
            />
            <input
              type="text"
              name="company_legalform"
              placeholder="Forme juridique"
              value={newContact.company_legalform}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  company_legalform: e.target.value,
                });
              }}
            />
            <input
              type="number"
              name="company_capital"
              placeholder="Capital"
              value={newContact.company_capital}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  company_capital: e.target.value,
                });
              }}
            />

            <input
              type="text"
              name="company_activity"
              placeholder="Activité"
              value={newContact.company_activity}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  company_activity: e.target.value,
                });
              }}
            />
            <input
              type="number"
              name="company_founded"
              placeholder="Année de création"
              value={newContact.company_founded}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  company_founded: e.target.value,
                });
              }}
            />
            <input
              type="number"
              name="company_registration_number"
              placeholder="Numéro d'immatriculation"
              value={newContact.company_registration_number}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  company_registration_number: e.target.value,
                });
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                marginTop: "30px",
              }}
              onClick={() => {
                setShowAddress(!showAddress);
              }}
            >
              <Icon
                icon={
                  !showAddress
                    ? "icons8:chevron-down-round"
                    : "icons8:chevron-up-round"
                }
                color="#b42f5a"
                width="25"
              />
              <h3>Adresse postale</h3>
            </div>

            <section className={showAddress ? "" : "filters-hide"}>
              <input
                type="text"
                name="company_address"
                placeholder="Adresse"
                value={newContact.company_address}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    company_address: e.target.value,
                  });
                }}
              />
              <input
                type="number"
                name="company_zip"
                placeholder="Code postal"
                value={newContact.company_zip}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    company_zip: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                name="company_city"
                placeholder="Ville"
                value={newContact.company_city}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    company_city: e.target.value,
                  });
                }}
              />
            </section>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                marginTop: "30px",
              }}
              onClick={() => {
                setShowSize(!showSize);
              }}
            >
              <Icon
                icon={
                  !showSize
                    ? "icons8:chevron-down-round"
                    : "icons8:chevron-up-round"
                }
                color="#b42f5a"
                width="25"
              />
              <h3>Nombre de salariés</h3>
            </div>
            <div className={showSize ? "" : "filters-hide"}>
              <input
                type="number"
                name="company_size_min"
                placeholder="Entre"
                value={newContact.company_size_min}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    company_size_min: e.target.value,
                  });
                }}
              />
              <input
                type="number"
                name="company_size_max"
                placeholder="Et"
                value={newContact.company_size_max}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    company_size_max: e.target.value,
                  });
                }}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setError({});

                if (
                  newContact.company_website === "" ||
                  newContact.company_name === ""
                ) {
                  const newError = { ...error };
                  if (newContact.company_name === "") {
                    newError.company_name_error =
                      "Veuillez saisir le nom de l'entreprise";
                  } else {
                    newError.company_name_error = "";
                  }
                  if (isValidUrl(newContact.company_website) === false) {
                    newError.company_website_error =
                      "Veuillez vérifier le site web de l'entreprise";
                  } else {
                    newError.company_website_error = "";
                  }

                  setError(newError);
                }

                if (
                  isValidUrl(newContact.company_website) &&
                  newContact.company_name !== ""
                ) {
                  setStep(2);
                }
              }}
            >
              Suivant
            </button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (
                newContact.contact_name === "" ||
                newContact.contact_email === ""
              ) {
                const newError = { ...error };
                if (newContact.contact_name === "") {
                  newError.contact_name_error =
                    "Veuillez saisir le nom du contact";
                } else {
                  newError.contact_name_error = "";
                }
                if (newContact.contact_email === "") {
                  newError.contact_email_error =
                    "Veuillez saisir l'email du contact";
                } else {
                  newError.contact_email_error = "";
                }
                setError(newError);
              }

              if (
                newContact.contact_name !== "" &&
                newContact.contact_email !== "" &&
                newContact.company_name !== "" &&
                newContact.company_website !== ""
              ) {
                SaveContact();
              }
              SaveContact();
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                marginTop: "30px",
              }}
              onClick={() => {
                setStep(1);
              }}
            >
              <Icon icon="ep:back" color="#b42f5a" width="25" />
              <h2>Information du contact</h2>
            </div>

            <p className="red">{error.contact_name_error}</p>
            <input
              type="text"
              style={{ borderLeft: "3px solid #b42f5a" }}
              required
              name="contact_name"
              placeholder="Nom du contact"
              value={newContact.contact_name}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  contact_name: e.target.value,
                });
              }}
            />

            <p className="red">{error.contact_email_error}</p>
            <input
              type="email"
              style={{ borderLeft: "3px solid #b42f5a" }}
              required
              name="contact_email"
              placeholder="Email"
              value={newContact.contact_email}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  contact_email: e.target.value,
                });
              }}
            />
            <input
              type="text"
              name="contact_role"
              placeholder="Fonction"
              value={newContact.contact_role}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  contact_role: e.target.value,
                });
              }}
            />
            <input
              type="text"
              name="contact_phone"
              placeholder="Téléphone"
              value={newContact.contact_phone}
              onChange={(e) => {
                setNewContact({
                  ...newContact,
                  contact_phone: e.target.value,
                });
              }}
            />
            {inProgress ? (
              <p>Enregistrement du contact en cours...</p>
            ) : (
              <button>Créer</button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
