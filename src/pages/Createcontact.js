import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Autocomplete from "../components/CreateContactAutocomplete";

const Createcontact = ({ token, server }) => {
  const [autocomplete, setAutocomplete] = useState("");
  return (
    <div>
      <h1>Create contact V2 Page</h1>
      <Autocomplete
        autocomplete={autocomplete}
        setAutocomplete={setAutocomplete}
        server={server}
      />
    </div>
  );
};

export default Createcontact;
