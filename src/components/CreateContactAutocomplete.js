import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Squares } from "react-activity";
import "react-activity/dist/library.css";

import axios from "axios";

const CreateContactAutocomplete = ({
  autocomplete,
  setAutocomplete,
  newContact,
  setNewContact,
  server,
  token,
  setCreateWithForm,
}) => {
  const [results, setResults] = useState("");
  const [contactName, setcontactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (autocomplete.length > 3) {
      try {
        const fetchData = async () => {
          const response = await axios.get(
            `${server}/affiliate/create/autocomplete?q=${autocomplete}`
          );
          setResults(response.data);
        };
        fetchData();
      } catch (error) {
        console.log("autocomplete error", error);
      }
    }
  }, [autocomplete, server]);

  // Save contact in database function

  const SaveContact = async (e) => {
    e.preventDefault();

    if (isValidForm(contactPhone, companyWebsite)) {
      setInProgress(true);

      newContact.contact_name = contactName;
      newContact.contact_role = contactRole;
      newContact.company_website = companyWebsite;
      newContact.contact_email = contactEmail;
      newContact.contact_phone = contactPhone;

      try {
        const response = await axios.post(
          `${server}/affiliate/create/savetodb`,
          {
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
            contact_name: newContact.contact_name,
            contact_role: newContact.contact_role,
            company_website: newContact.company_website,
            contact_email: newContact.contact_email,
            contact_phone: newContact.contact_phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInProgress(false);
        navigate(`/contact/${response.data._id}/edit`);
      } catch (error) {
        console.log("Erreur lors de la création du contact :", error.data);
        alert(
          "Erreur lors de la création du contact, merci de ré-essayer ou contacter votre administrateur si le problème persiste"
        );
        navigate("/");
      }
    } else return;
  };

  //form validation function (phone and url)
  const isValidForm = (phone, url) => {
    const phonePattern = /^\+?\d{10,}$/;
    const urlPattern = /^[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    let phoneCheck = true;
    let urlCheck = true;

    // check phone number
    if (phone.length > 0) {
      if (!phonePattern.test(phone)) {
        setContactPhone("");
        setError({ phone: true });
        phoneCheck = false;
      } else {
        phoneCheck = true;
      }
    } else {
      phoneCheck = true;
    }

    // check url
    if (!urlPattern.test(url)) {
      setCompanyWebsite("");
      setError({ url: true });
      urlCheck = false;
    } else {
      urlCheck = true;
    }
    // return true if both phone and url are valid
    if (phoneCheck && urlCheck) return true;
    else return false;
  };

  return !newContact.company_name ? (
    <div className="create-contact-container font">
      <div>
        <h1>Rechercher une entreprise</h1>
        <form>
          <input
            type="text"
            placeholder="Nom de l'entreprise..."
            value={autocomplete}
            onChange={(e) => {
              setAutocomplete(e.target.value);
            }}
          />
        </form>
        <p
          className="link"
          onClick={() => {
            setCreateWithForm(true);
          }}
        >
          Saisie manuelle
        </p>
      </div>
      <div>
        {results &&
          results.map((company, index) => {
            return (
              <div
                className="create-contact-results"
                key={index}
                onClick={() => {
                  setNewContact({
                    company_name: company.company_name,
                    company_legalform: company.company_legalform,
                    company_address: company.company_address,
                    company_zip: company.company_zip,
                    company_city: company.company_city,
                    company_size_min: company.company_size_min,
                    company_size_max: company.company_size_max,
                    company_capital: company.company_capital,
                    company_activity: company.company_activity,
                    company_founded: company.company_founded,
                    company_registration_number:
                      company.company_registration_number,
                  });
                }}
              >
                <div>
                  <h3>{company.company_name}</h3>
                  <p>
                    {company.company_activity}, {company.company_address},
                    {company.company_zip} {company.company_city}
                  </p>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon="fa-solid fa-angle-right"
                    size="lg"
                    style={{ color: "#b42f5a" }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <div className="create-contact-container font">
      <div className="create-contact-company-resumee">
        <a
          href="/contact/createv2"
          onClick={() => {
            setNewContact();
          }}
        >
          Sélectionner une autre entreprise
        </a>
        <h2>{newContact.company_name}</h2>
        <p>
          {newContact.company_legalform} au capital de{" "}
          {newContact.company_capital} €
        </p>
        <p>
          {newContact.company_address.toLowerCase()} {newContact.company_zip}{" "}
          {newContact.company_city}
        </p>
        {newContact.company_size_max - newContact.company_size_min > 1000 ? (
          <>
            <p>Nombre de salariés : Au moins {newContact.company_size_min}</p>
          </>
        ) : newContact.company_size_max === 0 ? (
          <p>Aucun salarié</p>
        ) : (
          <>
            <p>
              Effectifs : entre {newContact.company_size_min} et{" "}
              {newContact.company_size_max} salariés
            </p>{" "}
          </>
        )}

        <p>Date de création : {newContact.company_founded}</p>
      </div>
      {!inProgress ? (
        <>
          <form onSubmit={SaveContact}>
            <h2>Informations du contact</h2>
            <input
              type="text"
              style={{ borderLeft: "3px solid #b42f5a" }}
              required
              value={contactName}
              placeholder={"Nom et prénom du contact"}
              onChange={(e) => setcontactName(e.target.value)}
            />
            <input
              type="text"
              value={contactRole}
              placeholder="Fonction"
              onChange={(e) => setContactRole(e.target.value)}
            />
            <input
              style={
                error.url
                  ? { border: "2px solid #b42f5a", background: "#ffe3f6" }
                  : { borderLeft: "3px solid #b42f5a" }
              }
              type="text"
              required
              value={companyWebsite}
              placeholder={error.url ? "URL invalide" : "Site web"}
              onChange={(e) => setCompanyWebsite(e.target.value)}
            />

            <input
              type="email"
              required
              style={{ borderLeft: "3px solid #b42f5a" }}
              value={contactEmail}
              placeholder="Email"
              onChange={(e) => setContactEmail(e.target.value)}
            />

            <input
              style={
                error.phone
                  ? { border: "2px solid #b42f5a", background: "#ffe3f6" }
                  : null
              }
              type="text"
              value={contactPhone}
              placeholder={
                error.phone
                  ? "Format du numéro invalide"
                  : "Numéro de téléphone"
              }
              onChange={(e) => setContactPhone(e.target.value)}
            />
            <button>Créer le contact</button>
          </form>
        </>
      ) : (
        <div className="create-contact-activity">
          <Squares color="#b42f5a" size="100" />
        </div>
      )}
    </div>
  );
};

export default CreateContactAutocomplete;
