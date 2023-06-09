import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const Edition = ({ token, server }) => {
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

  // save changes state
  const [saveChanges, setSaveChanges] = useState(false);

  // fetch data from the API
  useEffect(() => {
    try {
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
        setCompany_registration_number(
          response.data.company_registration_number
        );

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
    } catch (error) {
      console.log(error.message);
    }
  }, [id, token]);

  //function to update the contact's informations
  const contactUpdate = async () => {
    try {
      const response = await axios.patch(
        `${server}/affiliate/${id}`,
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
      setSaveChanges(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="contact-container font">
      <div>
        <div style={{ backgroundColor: contact_status.status_color }}>
          {contact_status.status_name}
        </div>
        <div>
          <img src={company_favicon.url} alt="company logo" />
          <input
            type="text"
            style={{ fontSize: "25px", width: "60%" }}
            placeholder={company_name}
            value={company_name}
            onChange={(event) => {
              setCompany_name(event.target.value);
              setSaveChanges(true);
            }}
          />
        </div>
        <div>Smart Actions</div>
        <div>
          {saveChanges && <button onClick={contactUpdate}>Enregistrer</button>}
          <div>
            <p>Contact</p>
            <input
              type="text"
              style={{ width: contact_name.length * 7.5 }}
              placeholder={contact_name}
              value={contact_name}
              onChange={(event) => {
                setContact_name(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            <p>Fonction</p>
            <input
              style={{ width: contact_role.length * 7.5 }}
              type="text"
              placeholder={contact_role}
              value={contact_role}
              onChange={(event) => {
                setContact_role(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            <p>Telephone</p>
            <input
              type="text"
              style={{ width: contact_phone.length * 7.5 }}
              placeholder={contact_phone}
              value={contact_phone}
              onChange={(event) => {
                setContact_phone(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            <p>Adresse</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                style={{ width: company_address.length * 7 }}
                placeholder={company_address}
                value={company_address}
                onChange={(event) => {
                  setCompany_address(event.target.value);
                  setSaveChanges(true);
                }}
              />
              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <input
                  style={{ width: `50px` }}
                  type="text"
                  placeholder={company_zip}
                  value={company_zip}
                  onChange={(event) => {
                    setCompany_zip(event.target.value);
                    setSaveChanges(true);
                  }}
                />
                <input
                  type="text"
                  style={{ width: company_city.length * 8 }}
                  placeholder={company_city}
                  value={company_city}
                  onChange={(event) => {
                    setCompany_city(event.target.value);
                    setSaveChanges(true);
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <p>Site Internet</p>
            <input
              type="text"
              style={{ width: company_website.length * 7.5 }}
              placeholder={company_website}
              value={company_website}
              onChange={(event) => {
                setCompany_website(event.target.value);
                setSaveChanges(true);
              }}
            />
            <span onClick={() => window.open(`https://${company_website}`)}>
              lien
            </span>
          </div>
          <div>
            <p>Capital Social</p>
            <input
              style={{ width: "60px" }}
              type="text"
              value={company_capital}
              onChange={(event) => {
                setCompany_capital(event.target.value);
                setSaveChanges(true);
              }}
            />
            <span>€</span>
          </div>
          <div>
            <p>Forme Juridique</p>
            <textarea
              type="text"
              cols={25}
              rows={company_legalform.split.length}
              placeholder={company_legalform}
              value={company_legalform}
              onChange={(event) => {
                setCompany_legalform(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            <p>Taille de l'entreprise</p>
          </div>
          <div>
            <p>Date de création</p>
            <input
              type="text"
              style={{ width: company_founded.length * 9 }}
              placeholder={company_founded}
              value={company_founded}
              onChange={(event) => {
                setCompany_founded(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            <p>Numéro de SIREN</p>
            <input
              type="text"
              style={{ width: "100px" }}
              placeholder={company_registration_number}
              value={company_registration_number}
              onChange={(event) => {
                setCompany_registration_number(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            <p>Activité</p>

            <textarea
              type="text"
              cols={25}
              rows={company_activity.split.length}
              placeholder={company_activity}
              value={company_activity}
              onChange={(event) => {
                setCompany_activity(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          {saveChanges && <button>Enregistrer</button>}
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
