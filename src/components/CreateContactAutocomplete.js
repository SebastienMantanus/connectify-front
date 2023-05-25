import { useEffect, useState } from "react";
import axios from "axios";

const Autocomplete = ({ autocomplete, setAutocomplete, server }) => {
  const [results, setResults] = useState("");

  useEffect(() => {
    if (autocomplete.length > 3) {
      const fetchData = async () => {
        const response = await axios.get(
          `${server}/autocreate/autocomplete?q=${autocomplete}`
        );
        setResults(response.data);
      };
      fetchData();
    }
  }, [autocomplete]);
  return (
    <div>
      <div>
        <h1>Autocomplete</h1>
        <input
          type="text"
          value={autocomplete}
          onChange={(e) => {
            setAutocomplete(e.target.value);
          }}
        />
        {results &&
          results.map((company, index) => {
            return (
              <div key={index}>
                <h3>{company.company_name}</h3>
                <p>
                  {company.company_address}, {company.company_city}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Autocomplete;
