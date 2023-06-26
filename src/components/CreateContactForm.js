import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateContactForm = ({
  newContact,
  setNewContact,
  server,
  token,
}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [step, setStep] = useState(1);

  //create the new contact object
  // useEffect(() => {
  //   setIsLoading(true);
  //   setNewContact({
  //     company_name: "",
  //     company_legalform: "",
  //     company_address: "",
  //     company_zip: "",
  //     company_city: "",
  //     company_size_min: "",
  //     company_size_max: "",
  //     company_capital: "",
  //     company_activity: "",
  //     company_founded: "",
  //     company_registration_number: "",
  //     company_website: "",
  //     contact_name: "",
  //     contact_role: "",
  //     contact_email: "",
  //     contact_phone: "",
  //   });
  //   setIsLoading(false);
  // }, [setNewContact]);

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
    !isLoading && (
      <div className="create-contact-container font">
        <div>
          <h1>Nouveau contact</h1>
          {step === 1 ? (
            <form>
              <h2>1. Saisir les information de l'entreprise</h2>
              <h3>Informations générales</h3>
              <input
                type="text"
                required
                name="company_name"
                placeholder="Nom de l'entreprise"
                value={newContact.company_name}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    company_name: e.target.value,
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
                type="text"
                name="company_website"
                required
                placeholder="Site web"
                value={newContact.company_website}
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    company_website: e.target.value,
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
              <h3>Adresse postale</h3>
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
              <h3>Nombre de salariés</h3>
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                Suivant
              </button>
            </form>
          ) : (
            <form>
              <h2>2. Saisir les information du contact</h2>
              <input
                type="text"
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
                type="email"
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStep(1);
                }}
              >
                Précédent
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // checkEmpty();
                  SaveContact();
                }}
              >
                Créer
              </button>
            </form>
          )}
        </div>
      </div>
    )
  );
};
