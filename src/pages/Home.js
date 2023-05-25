import { useNavigate, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import addIcon from "../assets/add.png";

const Home = ({ token, server, SetToken }) => {
  const [isLoading, SetIsLoading] = useState(true);
  const [data, SetData] = useState();
  // const [user, SetUser] = useState();
  const [search, SetSearch] = useState("");
  const [searchType, SetSearchType] = useState("name");
  const navigate = useNavigate(); // rappel

  let filter = "";
  if (search.length > 3) {
    filter = `&${searchType}=${search}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${server}/affiliates-search?limit=11+${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      SetData(response.data[1]);
      // SetUser(response.data[0]);
      SetIsLoading(false);
    };
    fetchData();
  }, [search, filter, token]);

  return token ? (
    isLoading ? (
      <div>Loading in progress</div>
    ) : (
      <div className="flex-center font">
        <div
          className="home-container 
  "
        >
          <div className="top-bar">
            <h2>{data.length} contacts</h2>
            <div>
              <select
                onChange={(event) => {
                  SetSearchType(event.target.value);
                }}
              >
                <option value="name">Entreprise</option>
                <option value="contact">Contact</option>
                <option value="email">Email</option>
              </select>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(event) => {
                  SetSearch(event.target.value);
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
