import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import addIcon from "../assets/images/add.png";
//import Filter component
import Filters from "../components/Filters";

//import heat icons assets
import heat0 from "../assets/images/heat_0.png";
import heat1 from "../assets/images/heat_1.png";
import heat2 from "../assets/images/heat_2.png";
import heat3 from "../assets/images/heat_3.png";

//import responsbles folders & phone icons assets
import folderIco from "../assets/images/folder_ico.png";
import responsableIco from "../assets/images/responsable_ico.png";
import phoneIco from "../assets/images/phone_ico.png";

// import smart_action icons assets
import smartActionEmail from "../assets/images/smart_action_email.png";
import smartActionWebsite from "../assets/images/smart_action_website.png";
import smartActionPappers from "../assets/images/smart_action_pappers.png";
import smartActionEdit from "../assets/images/smart_action_edit.png";

const Home = ({ token, server, SetToken }) => {
  const [isLoading, SetIsLoading] = useState(true);
  const [data, SetData] = useState();
  const [searchQuery, SetSearchQuery] = useState("");

  console.log("token>>", token);

  // useStates for filters (contact_folder, contact_heat, contact_status, responsable)
  const [contactFolder, setContactFolder] = useState("");
  const [contactHeat, setContactHeat] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [responsable, setResponsable] = useState("");

  // Hovered Index useState
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navigate = useNavigate(); // rappel

  // function to handle search input
  let query = "";
  if (searchQuery.length > 3) {
    query = `q=${searchQuery}`;
  }

  // add filters to query if they are not empty
  if (contactFolder) {
    query = query + `&contact_folder=${contactFolder}`;
  }
  if (contactHeat) {
    query = query + `&contact_heat=${contactHeat}`;
  }
  if (contactStatus) {
    query = query + `&contact_status=${contactStatus}`;
  }
  if (responsable) {
    query = query + `&responsable=${responsable}`;
  }

  useEffect(() => {
    console.log("query>>", query);
    const fetchData = async () => {
      const response = await axios.get(`${server}/affiliates?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      SetData(response.data);
      SetIsLoading(false);
    };
    fetchData();
  }, [searchQuery, query, server, token]);

  //function to display heat icon
  const displayHeat = (heat) => {
    switch (heat) {
      case 0:
        return <img alt="unknow" src={heat0} />;
      case 1:
        return <img alt="cold" src={heat1} />;
      case 2:
        return <img alt="warm" src={heat2} />;
      case 3:
        return <img alt="hot" src={heat3} />;
      default:
        return <img alt="unknow" src={heat0} />;
    }
  };

  //function to display the first world of the string legalform
  const displayLegalform = (LegalForm) => {
    const legalform = LegalForm.split(" ");
    //if the last character of the string is , we remove it
    if (legalform[0].charAt(legalform[0].length - 1) === ",") {
      legalform[0] = legalform[0].slice(0, -1);
    }
    return legalform[0];
  };

  // shorten company name if it's more than 18 characters
  const shortenCompanyName = (companyName) => {
    if (companyName.length > 18) {
      return companyName.slice(0, 18) + "...";
    } else {
      return companyName;
    }
  };

  return token ? (
    isLoading ? (
      <div>Loading in progress</div>
    ) : (
      <div className="flex-center font">
        <div className="home-left">
          <h2>Filtres</h2>
          <Filters
            token={token}
            server={server}
            contactFolder={contactFolder}
            setContactFolder={setContactFolder}
            responsable={responsable}
            setResponsable={setResponsable}
            contactHeat={contactHeat}
            setContactHeat={setContactHeat}
            contactStatus={contactStatus}
            setContactStatus={setContactStatus}
          />
        </div>
        <div
          className="home-container 
  "
        >
          <div className="top-bar">
            <h2>{data.length} contacts</h2>
            <div>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(event) => {
                  SetSearchQuery(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="contact-grid ">
            <div
              className="new-contact-card"
              onClick={() => {
                navigate("/contact/createv2");
              }}
            >
              <img src={addIcon} alt="créer une fiche" />
              <h1>Créer un nouveau contact</h1>
            </div>
            {data.map((item) => {
              const linkUrl = `/contact/${item._id}/edit`;

              return (
                <div
                  key={item._id}
                  // on mouse over, display quick actions
                  onMouseOver={() => {
                    setHoveredIndex(item._id);
                  }}
                  // on mouse out, hide quick actions
                  onMouseOut={() => {
                    setHoveredIndex(null);
                  }}
                >
                  <div className="contact-cards">
                    <div>
                      <div
                        style={{
                          backgroundColor: item.contact_status.status_color,
                        }}
                      >
                        <p>{item.contact_status.status_name}</p>
                      </div>
                      <div>{displayHeat(item.contact_heat)}</div>
                    </div>
                    <div>
                      <div>
                        <img
                          alt="company logo"
                          src={item.company_favicon.url}
                        />
                      </div>
                      <div>
                        <h2>{item.contact_name}</h2>
                        {/* <p>{item.contact_role}</p> */}
                      </div>
                    </div>
                    <div>
                      <h3>
                        {shortenCompanyName(item.company_name)}{" "}
                        {displayLegalform(item.company_legalform)}
                      </h3>
                      <p>{item.company_city}</p>

                      {item.company_size_max - item.company_size_min > 1000 ? (
                        <>
                          <p>
                            Au moins {item.company_size_min} {"salarié(s)"}
                          </p>
                        </>
                      ) : item.company_size_max === 0 ? (
                        <p>Aucun salarié</p>
                      ) : (
                        <>
                          <p>
                            Entre {item.company_size_min} et{" "}
                            {item.company_size_max} salariés
                          </p>{" "}
                        </>
                      )}
                    </div>
                    <div>
                      <div>
                        <img alt="Owner icon" src={responsableIco} />{" "}
                        <span>{item.responsable.name}</span>
                      </div>
                      <div>
                        {" "}
                        <img alt="Folder icon" src={folderIco} />
                        <span> {item.contact_folder.name}</span>
                      </div>
                    </div>

                    <div>
                      <img alt="phone icon" src={phoneIco} />
                      <span>{item.contact_phone}</span>
                    </div>
                    {hoveredIndex === item._id && (
                      <div className="contact-cards-actions">
                        <div>
                          <img
                            alt="email icon"
                            src={smartActionEmail}
                            onClick={() => {
                              window.open(`mailto:${item.contact_email}`);
                            }}
                            title="Envoyer un email"
                          />
                          <img
                            alt="website icon"
                            src={smartActionWebsite}
                            onClick={() => {
                              window.open(`https://${item.company_website}`);
                            }}
                            title="Voir le site web"
                          />
                          <img
                            alt="Pappers icon"
                            src={smartActionPappers}
                            onClick={() => {
                              window.open(
                                `https://www.pappers.fr/entreprise/${item.company_registration_number}`
                              );
                            }}
                            title="Voir la fiche sur Pappers"
                          />
                          <img
                            alt="Edit icon"
                            src={smartActionEdit}
                            onClick={() => {
                              navigate(linkUrl);
                            }}
                            title="Modifier la fiche"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  ) : (
    <Navigate to="/" />
  );
};

export default Home;
