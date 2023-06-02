import { useNavigate, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import addIcon from "../assets/add.png";
//import Filter component
import Filters from "../components/Filters";

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

  useEffect(() => {
    console.log("contactFolder>>", contactFolder);
    console.log("responsable>>", responsable);
    console.log("contactHeat>>", contactHeat);
  }, [contactFolder, responsable, contactHeat]);

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
                <Link to={linkUrl}>
                  <div key={item._id} className="contact-cards">
                    <h2>{item.company_name}</h2>
                    <h3>{item.contact_name}</h3>
                    {item.company_activity.length > 100 ? (
                      <p>{item.company_activity.substring(0, 100)}...</p>
                    ) : (
                      <p>{item.company_activity}</p>
                    )}
                    <p>{item.contact_phone}</p>
                  </div>
                </Link>
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
