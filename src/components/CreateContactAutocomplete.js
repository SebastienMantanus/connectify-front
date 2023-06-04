import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { render } from "react-dom";
import { Squares } from "react-activity";
import "react-activity/dist/library.css";

// Phone imput component import
// import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import axios from "axios";

const Autocomplete = ({
  autocomplete,
  setAutocomplete,
  newContact,
  setNewContact,
  server,
  token,
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
      const fetchData = async () => {
        const response = await axios.get(
          `${server}/affiliate/create/autocomplete?q=${autocomplete}`
        );
        setResults(response.data);
      };
      fetchData();
    }
  }, [autocomplete]);

  // Save contact in database function
  const SaveContact = async (e) => {
    e.preventDefault();

    if (
      contactName &&
      contactRole &&
      companyWebsite &&
      contactEmail &&
      contactPhone
    ) {
      setInProgress(true);

      newContact.contact_name = contactName;
      newContact.contact_role = contactRole;
      newContact.company_website = companyWebsite;
      newContact.contact_email = contactEmail;
      newContact.contact_phone = contactPhone;

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

      navigate(`/contact/${response.data._id}`);
    } else
      setError(
        "Merci de renseigner tous les champs afin d'entregistrer le contact"
      );
  };

  return !newContact ? (
    <div className="create-contact-container font">
      <div>
        <h1>Nouveau contact</h1>
        <input
          type="text"
          placeholder="Nom de l'entreprise..."
          value={autocomplete}
          onChange={(e) => {
            setAutocomplete(e.target.value);
          }}
        />
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
              required
              value={contactName}
              placeholder={"Nom et prénom du contact"}
              onChange={(e) => setcontactName(e.target.value)}
            />
            <input
              type="text"
              required
              value={contactRole}
              placeholder="Fonction"
              onChange={(e) => setContactRole(e.target.value)}
            />
            <input
              type="text"
              required
              value={companyWebsite}
              placeholder="Site Internet"
              onChange={(e) => setCompanyWebsite(e.target.value)}
            />
            <input
              type="email"
              required
              value={contactEmail}
              placeholder="Email"
              onChange={(e) => setContactEmail(e.target.value)}
            />

            {/* <input
              type="text"
              required
              value={contactPhone}
              placeholder="Numéro de téléphone"
              onChange={(e) => setContactPhone(e.target.value)}
            /> */}
            <PhoneInput
              defaultCountry="FR"
              placeholder="Numéro de téléphone"
              value={contactPhone}
              onChange={setContactPhone}
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

export default Autocomplete;
