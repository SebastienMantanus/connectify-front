import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import axios from "axios";

const Edition = ({ server }) => {
  //get token from cookies
  const token = Cookies.get("token");
  // console.log("TOKEN>>", token);
  // console.log("SERVER>>", server);

  const { id } = useParams();
  const [isLoading, SetIsLoading] = useState(true);

  //create a glogal state which will be used to display the contact's informations

  const [company_name, setCompany_name] = useState();
  const [company_website, setCompany_website] = useState();
  const [company_favicon, setCompany_favicon] = useState();
  const [company_activity, setCompany_activity] = useState();
  const [company_address, setCompany_address] = useState();
  const [company_city, setCompany_city] = useState();
  const [company_zip, setCompany_zip] = useState();
  const [company_legalform, setCompany_legalform] = useState();
  const [company_size_min, setCompany_size_min] = useState();
  const [company_size_max, setCompany_size_max] = useState();
  const [company_capital, setCompany_capital] = useState();
  const [company_founded, setCompany_founded] = useState();
  const [company_registration_number, setCompany_registration_number] =
    useState();

  const [contact_name, setContact_name] = useState();
  const [contact_role, setContact_role] = useState();
  const [contact_email, setContact_email] = useState();
  const [contact_phone, setContact_phone] = useState();

  const [contact_folder, setContact_folder] = useState();
  const [contact_status, setContact_status] = useState();
  const [contact_heat, setContact_heat] = useState();
  const [responsable, setResponsable] = useState();

  // fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${server}/affiliate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // set the global state to the contact's informations
      setCompany_name(response.data.company_name);
      setCompany_website(response.data.company_website);
      setCompany_favicon(response.data.company_favicon);
      setCompany_activity(response.data.company_activity);
      setCompany_address(response.data.company_address);
      setCompany_city(response.data.company_city);
      setCompany_zip(response.data.company_zip);
      setCompany_legalform(response.data.company_legalform);
      setCompany_size_min(response.data.company_size_min);
      setCompany_size_max(response.data.company_size_max);
      setCompany_capital(response.data.company_capital);
      setCompany_founded(response.data.company_founded);
      setCompany_registration_number(response.data.company_registration_number);

      setContact_name(response.data.contact_name);
      setContact_role(response.data.contact_role);
      setContact_email(response.data.contact_email);
      setContact_phone(response.data.contact_phone);

      setContact_folder(response.data.contact_folder);
      setContact_status(response.data.contact_status);
      setContact_heat(response.data.contact_heat);
      setResponsable(response.data.responsable);

      SetIsLoading(false);
    };
    fetchData();
  }, [id, token]);

  //function to update the contact's informations
  const contactUpdate = async () => {
    const response = await axios.post(
      `${server}/affiliate/update/${id}`,
      {
        company_name: company_name,
        company_website: company_website,
        company_favicon: company_favicon,
        company_activity: company_activity,
        company_address: company_address,
        company_city: company_city,
        company_zip: company_zip,
        company_legalform: company_legalform,
        company_size_min: company_size_min,
        company_size_max: company_size_max,
        company_capital: company_capital,
        company_founded: company_founded,
        company_registration_number: company_registration_number,

        contact_name: contact_name,
        contact_role: contact_role,
        contact_email: contact_email,
        contact_phone: contact_phone,

        contact_folder: contact_folder,
        contact_status: contact_status,
        contact_heat: contact_heat,
        responsable: responsable,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="contact-container font">
      <div>
        <div>En cours</div>
        <div>
          <div>Avatar</div>

          {/* <input
            type="text"
            placeholder={contact.company_name}
            value={contact.company_name}
            onChange={(event) => {
              setCompany_name(event.target.value);
            }}
          /> */}

          {/* <div>{contact.company_name}</div> */}
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
