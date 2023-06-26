import { useState } from "react";

import Autocomplete from "../components/CreateContactAutocomplete";
import { CreateContactForm } from "../components/CreateContactForm";

const Createcontact = ({ token, server }) => {
  const [autocomplete, setAutocomplete] = useState("");
  const [newContact, setNewContact] = useState({
    company_name: "",
    company_legalform: "",
    company_address: "",
    company_zip: "",
    company_city: "",
    company_size_min: "",
    company_size_max: "",
    company_capital: "",
    company_activity: "",
    company_founded: "",
    company_registration_number: "",
    company_website: "",
    contact_name: "",
    contact_role: "",
    contact_email: "",
    contact_phone: "",
  });
  const [createWithForm, setCreateWithForm] = useState(false);

  return (
    <div>
      {!createWithForm ? (
        <Autocomplete
          autocomplete={autocomplete}
          setAutocomplete={setAutocomplete}
          newContact={newContact}
          setNewContact={setNewContact}
          server={server}
          token={token}
          setCreateWithForm={setCreateWithForm}
        />
      ) : (
        <CreateContactForm
          newContact={newContact}
          setNewContact={setNewContact}
          server={server}
          token={token}
        />
      )}
    </div>
  );
};

export default Createcontact;
