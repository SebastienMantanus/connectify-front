import { useNavigate, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ token, SetToken }) => {
  const [isLoading, SetIsLoading] = useState(true);
  const [data, SetData] = useState();
  const [user, SetUser] = useState();
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
        `http://localhost:3000/affiliates-search?limit=12+${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      SetData(response.data[1]);
      SetUser(response.data[0]);
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
          className="home-container border-red
  "
        >
          <div className="top-bar">
            <div>{data.length} contacts</div>
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
            <div>
              <button
                onClick={() => {
                  navigate("/contact/create");
                }}
              >
                Nouveau Contact
              </button>
            </div>
          </div>

          <div className="contact-grid">
            {data.map((item, index) => {
              return (
                <div key={item._id} className="contact-cards">
                  <h2>{item.name}</h2>
                  <h3>{item.contact}</h3>
                  {item.description.length > 100 ? (
                    <p>{item.description.substring(0, 100)}...</p>
                  ) : (
                    <p>{item.description}</p>
                  )}
                  <p>{item.telephone}</p>
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
