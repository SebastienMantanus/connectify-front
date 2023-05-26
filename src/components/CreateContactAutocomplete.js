import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  useEffect(() => {
    if (autocomplete.length > 3) {
      const fetchData = async () => {
        const response = await axios.get(
          `${server}/autocreate/autocomplete?q=${autocomplete}`
        );
        setResults(response.data);
      };
      fetchData();
    }
  }, [autocomplete]);

  // Save contact in database function
  const SaveContact = async (e) => {
    e.preventDefault();

    newContact.contact_name = contactName;
    newContact.contact_role = contactRole;
    newContact.company_website = companyWebsite;
    newContact.contact_email = contactEmail;
    newContact.contact_phone = contactPhone;

    const response = await axios.post(
      `${server}/autocreate/contactcreate`,
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
    alert("Le contact a été créé");
    navigate("/home");
  };

  return !newContact ? (
    <div>
      <div>
        <h1>Autocomplete</h1>
        <input
          type="text"
          value={autocomplete}
          onChange={(e) => {
            setAutocomplete(e.target.value);
          }}
        />
        {results &&
          results.map((company, index) => {
            return (
              <div
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
                <h3>{company.company_name}</h3>
                <p>
                  {company.company_address}, {company.company_city}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <div>
      <h2>{newContact.company_name}</h2>
      <h3>Informations de contact</h3>
      <form onSubmit={SaveContact}>
        <input
          type="text"
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
          type="text"
          value={companyWebsite}
          placeholder="Site Internet"
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
        <input
          type="email"
          value={contactEmail}
          placeholder="Email"
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <input
          type="text"
          value={contactPhone}
          placeholder="Numéro de téléphone"
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <button>Créer le contact</button>
      </form>
    </div>
  );
};

export default Autocomplete;
