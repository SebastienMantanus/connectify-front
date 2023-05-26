import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Autocomplete from "../components/CreateContactAutocomplete";

const Createcontact = ({ token, server }) => {
  const [autocomplete, setAutocomplete] = useState("");
  const [newContact, setNewContact] = useState();
  return (
    <div>
      <Autocomplete
        autocomplete={autocomplete}
        setAutocomplete={setAutocomplete}
        newContact={newContact}
        setNewContact={setNewContact}
        server={server}
        token={token}
      />
    </div>
  );
};

export default Createcontact;
