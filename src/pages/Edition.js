import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

//import components
import QuickUpdate from "../components/QuickUpdate";
import Notes from "../components/Notes";

//import icons assets
import saWebsite from "../assets/images/smart_action_website_red.png";
import saEmail from "../assets/images/smart_action_email_red.png";
import saBack from "../assets/images/smart_action_back_red.png";
import saPapper from "../assets/images/smart_action_pappers_red.png";

const Edition = ({ token, server }) => {
  // useNavigate hook
  const navigate = useNavigate();

  // get the contact's id from the url
  const { id } = useParams();

  // useStates for the contact's informations
  const [isLoading, SetIsLoading] = useState(true);
  const [toUpdate, setToUpdate] = useState(false);

  //statew which will be used to display and update contact informations
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
        setToUpdate(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [id, token, toUpdate, server]);

  //function to update the contact's informations
  const contactUpdate = async () => {
    try {
      await axios.patch(
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

  // auto resize the textareas height function
  const autoResize = (input, characters) => {
    if (input === company_name) {
      if (characters > 18) {
        return 2;
      } else {
        return 1;
      }
    }
    if (input === company_legalform || input === company_activity) {
      if (characters > 32) {
        return characters / 32 + 1;
      } else {
        return 1;
      }
    }
  };
  // fuction to delete the contact

  const contactDelete = async () => {
    // display a confirm message
    const confirm = window.confirm(
      "Etes-vous sûr de vouloir supprimer ce contact ?"
    );
    if (!confirm) {
      return;
    }
    // delete the contact
    await axios.delete(`${server}/affiliate/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate("/");
  };

  // auto resize inputs width function
  const autoResizeWidth = (characters) => {
    return "80%";
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
          <textarea
            type="text"
            cols={25}
            rows={autoResize(company_name, company_name.length)}
            style={{ fontSize: "18px", width: "60%", lineHeight: "1.2" }}
            placeholder={company_name}
            value={company_name}
            onChange={(event) => {
              setCompany_name(event.target.value);
              setSaveChanges(true);
            }}
          />
        </div>
        <div>
          <img
            src={saBack}
            alt="smart action back"
            onClick={() => navigate("/home")}
            title="Retour à la liste de contacts"
          />
          <img
            src={saWebsite}
            alt="smart action website"
            onClick={() => {
              window.open(`https://${company_website}`);
            }}
            title="Ouvrir le site internet"
          />
          <img
            src={saEmail}
            alt="smart action email"
            onClick={() => {
              window.open(`mailto:${contact_email}`);
            }}
            title="Envoyer un email"
          />
          <img
            src={saPapper}
            alt="smart action papper"
            onClick={() => {
              window.open(
                `https://www.pappers.fr/entreprise/${company_registration_number}`
              );
            }}
            title="Voir les informations sur Pappers"
          />
        </div>
        <div>
          <div>
            <p>Contact</p>
            <input
              type="text"
              style={{ width: autoResizeWidth(contact_name.length) }}
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
              style={{ width: autoResizeWidth(contact_role.length) }}
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
              style={{ width: autoResizeWidth(contact_phone.length) }}
              placeholder={contact_phone}
              value={contact_phone}
              onChange={(event) => {
                setContact_phone(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            <p>Email</p>

            <input
              type="text"
              style={{ width: autoResizeWidth(contact_email.length) }}
              placeholder={contact_email}
              value={contact_email}
              onChange={(event) => {
                setContact_email(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            <p>Adresse</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                style={{ width: autoResizeWidth(company_address.length) }}
                placeholder={company_address}
                value={company_address}
                onChange={(event) => {
                  setCompany_address(event.target.value);
                  setSaveChanges(true);
                }}
              />
              <div
                style={{
                  display: "block",
                  marginBottom: "-30px",
                }}
              >
                <input
                  style={{ width: autoResizeWidth(company_zip.length) }}
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
                  style={{ width: autoResizeWidth(company_city.length) }}
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
            <p
              onClick={() => window.open(`https://${company_website}`)}
              style={{ cursor: "pointer" }}
            >
              Site Internet
            </p>
            <input
              type="text"
              style={{ width: autoResizeWidth(company_website.length) }}
              placeholder={company_website}
              value={company_website}
              onChange={(event) => {
                setCompany_website(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            {company_capital && (
              <>
                <p>Capital Social (€)</p>
                <input
                  style={{ width: autoResizeWidth(company_capital.length) }}
                  type="text"
                  value={company_capital}
                  onChange={(event) => {
                    setCompany_capital(event.target.value);
                    setSaveChanges(true);
                  }}
                />
              </>
            )}
          </div>
          <div>
            <p>Forme Juridique</p>
            <textarea
              type="text"
              cols={25}
              rows={autoResize(company_legalform, company_legalform.length)}
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
              style={{ width: autoResizeWidth(company_founded.length) }}
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
              style={{
                width: autoResizeWidth(company_registration_number.length),
              }}
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
              rows={autoResize(company_activity, company_activity.length)}
              placeholder={company_activity}
              value={company_activity}
              onChange={(event) => {
                setCompany_activity(event.target.value);
                setSaveChanges(true);
              }}
            />
          </div>
          <div>
            <button onClick={contactDelete}>Supprimer le contact</button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <QuickUpdate
            server={server}
            token={token}
            id={id}
            toUpdate={toUpdate}
            setToUpdate={setToUpdate}
          />
        </div>
        <div>
          <Notes server={server} token={token} id={id} />
        </div>
      </div>
      {saveChanges && (
        <div className="save-update">
          <button onClick={contactUpdate}>Enregistrer les modifications</button>
        </div>
      )}
    </div>
  );
};

export default Edition;
