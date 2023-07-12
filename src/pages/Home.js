import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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

  // useStates for filters (contact_folder, contact_heat, contact_status, responsable)
  const [contactFolder, setContactFolder] = useState("");
  const [contactHeat, setContactHeat] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [responsable, setResponsable] = useState("");

  // useStates for skip and limit
  const [skip, setSkip] = useState(0);
  const limit = 7;
  const [numberOfContacts, setNumberOfContacts] = useState(0);

  // Hovered Index useState
  const [hoveredIndex, setHoveredIndex] = useState(null);

  //Draf & Drop refs
  const userToUpdate = useRef();
  const destinationFolder = useRef();
  const destinationUser = useRef();
  const destinationStatus = useRef();
  const destinationHeat = useRef();

  const navigate = useNavigate(); // rappel

  // useState to reload the component when a contact is updated
  const [reload, setReload] = useState(false);

  // function to handle search input
  let query = "";
  if (searchQuery.length > 3) {
    query = `q=${searchQuery}`;
  }

  // add filters to query if they are not empty
  //#region
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
  //#endregion

  // fetch data from API

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${server}/affiliates?${query}&skip=${skip}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      SetData(response.data);
      setReload(false);
      SetIsLoading(false);
    };
    fetchData();
  }, [searchQuery, query, server, skip, limit, token, reload]);

  // Skpip & limit management

  // fetch number of contacts with filters querry
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${server}/affiliates?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNumberOfContacts(response.data.length);
    };
    fetchData();
  }, [searchQuery, query, server, token]);

  const pagesArray = [];
  for (let i = 0; i < numberOfContacts / limit; i++) {
    pagesArray.push(i + 1);
  }

  //fuction to return the skip & limit bar

  function skipLimitBar() {
    return (
      <div className="top-bar-nav-array">
        {skip > 0 && (
          <button
            onClick={() => {
              setSkip(skip - limit);
            }}
          >
            Précédent
          </button>
        )}

        {pagesArray.map((page) => {
          if (page > 10) {
            return <p>...</p>;
          } else {
            return (
              <div
                key={page}
                className={page === skip / limit + 1 ? "bold" : ""}
                onClick={() => {
                  setSkip(0);
                  setSkip((page - 1) * limit);
                }}
              >
                {page}
              </div>
            );
          }
        })}

        {skip < numberOfContacts - limit && (
          <button
            onClick={() => {
              setSkip(skip + limit);
            }}
          >
            Suivant
          </button>
        )}
      </div>
    );
  }

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
            destinationFolder={destinationFolder}
            destinationUser={destinationUser}
            destinationStatus={destinationStatus}
            destinationHeat={destinationHeat}
            userToUpdate={userToUpdate}
            setReload={setReload}
          />
        </div>
        <div
          className="home-container 
  "
        >
          <div className="top-bar">
            <h2>{numberOfContacts} contacts</h2>
            {pagesArray.length > 1 && skipLimitBar()}

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

            {data.map((item, index) => {
              const linkUrl = `/contact/${item._id}/edit`;

              return (
                <div
                  className="contact-cards"
                  key={item._id}
                  // on mouse over, display quick actions
                  onMouseOver={() => {
                    setHoveredIndex(item._id);
                  }}
                  // on mouse out, hide quick actions
                  onMouseOut={() => {
                    setHoveredIndex(null);
                  }}
                  draggable
                  // on drag start, set the source item
                  onDragStart={(e) => {
                    userToUpdate.current = item._id;
                  }}
                >
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
                      {item.company_favicon && (
                        <img
                          alt="company logo"
                          src={item.company_favicon.url}
                        />
                      )}
                    </div>
                    <div>
                      <h2>{item.contact_name}</h2>
                    </div>
                  </div>
                  <div>
                    <h3>
                      {shortenCompanyName(item.company_name)}{" "}
                      {displayLegalform(item.company_legalform)}
                    </h3>
                    <p>{item.company_city}</p>
                    {item.company_size_min && item.company_size_max ? (
                      item.company_size_max - item.company_size_min > 1000 ? (
                        <>
                          <p>
                            Au moins {item.company_size_min} {"salarié(s)"}
                          </p>
                        </>
                      ) : item.company_size_max === 0 ||
                        item.company_size_min === 0 ? (
                        <p>Aucun salarié</p>
                      ) : (
                        <>
                          <p>
                            Entre {item.company_size_min} et{" "}
                            {item.company_size_max} salariés
                          </p>{" "}
                        </>
                      )
                    ) : item.company_size_min ? (
                      <p>{item.company_size_min} personne(s)</p>
                    ) : null}
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
                    {item.contact_phone ? (
                      <>
                        <img alt="phone icon" src={phoneIco} />
                        <span>{item.contact_phone}</span>
                      </>
                    ) : (
                      <p>Téléphone non renseigné</p>
                    )}
                  </div>

                  {hoveredIndex === item._id && (
                    <div className="contact-cards-actions">
                      <div>
                        {item.contact_email && (
                          <img
                            alt="email icon"
                            src={smartActionEmail}
                            onClick={() => {
                              window.open(`mailto:${item.contact_email}`);
                            }}
                            title="Envoyer un email"
                          />
                        )}
                        {item.company_website && (
                          <img
                            alt="website icon"
                            src={smartActionWebsite}
                            onClick={() => {
                              window.open(`https://${item.company_website}`);
                            }}
                            title="Voir le site web"
                          />
                        )}

                        {item.company_registration_number && (
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
                        )}

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
              );
            })}
          </div>

          {pagesArray.length > 1 && (
            <div style={{ marginBottom: "10px" }}>{skipLimitBar()}</div>
          )}
        </div>
      </div>
    )
  ) : (
    <Navigate to="/" />
  );
};

export default Home;
