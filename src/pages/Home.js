import { useNavigate, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import addIcon from "../assets/add.png";
//import Filter component
import Filters from "../components/Filters";

//import heat icons
import heat0 from "../assets/heat_0.png";
import heat1 from "../assets/heat_1.png";
import heat2 from "../assets/heat_2.png";
import heat3 from "../assets/heat_3.png";

const Home = ({ token, server, SetToken }) => {
  const [isLoading, SetIsLoading] = useState(true);
  const [data, SetData] = useState();
  const [searchQuery, SetSearchQuery] = useState("");

  // useStates for filters (contact_folder, contact_heat, contact_status, responsable)
  const [contactFolder, setContactFolder] = useState("");
  const [contactHeat, setContactHeat] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [responsable, setResponsable] = useState("");

  const navigate = useNavigate(); // rappel

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

  // format contact_phone with spaces between eatch 2 numbers
  const formatPhone = (phone) => {
    const phoneArray = phone.split("");
    const phoneArrayWithSpaces = phoneArray.map((number, index) => {
      if (index === 1 || index === 3 || index === 5 || index === 7) {
        return number + " ";
      } else {
        return number;
      }
    });
    return phoneArrayWithSpaces.join("");
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
            {data.map((item, index) => {
              const linkUrl = `/contact/${item._id}`;
              return (
                // <Link to={linkUrl}>
                <div key={item._id} className="contact-cards">
                  {/* contact status */}
                  <div
                    style={{
                      backgroundColor: item.contact_status.status_color,
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                      marginTop: "-1px",

                      height: "10px",
                    }}
                  ></div>
                  {/* Contact informations */}
                  <div>
                    <div>
                      {displayHeat(item.contact_heat)}
                      <h2>{item.company_name}</h2>
                      <h3>{item.contact_name}</h3>
                      <p>{formatPhone("0" + item.contact_phone)}</p>
                    </div>
                    <div>
                      <p>{item.contact_email}</p>
                    </div>
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
