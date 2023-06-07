import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const Edition = ({ token, server }) => {
  console.log("TOKEN>>", token);
  console.log("SERVER>>", server);

  const { id } = useParams();
  const [isLoading, SetIsLoading] = useState(true);

  //create a glogal state which will be used to display the contact's informations
  const [contact, setContact] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${server}/affiliate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContact(response.data);
      SetIsLoading(false);
    };
    fetchData();
  }, [id, token]);

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="contact-container font">
      <div>
        <div>En cours</div>
        <div>
          <div>Avatar</div>
          <div>{contact.company_name}</div>
        </div>
        <div>Smart Actions</div>
        <div>
          <p>Editer le contact</p>
        </div>
      </div>
      <div>
        <div>Quick updates</div>
        <p>Historique & smart actions</p>
      </div>
    </div>
  );
};

export default Edition;
