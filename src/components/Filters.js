import { useEffect, useState } from "react";
import axios from "axios";

const Filters = ({ token, server }) => {
  const [isLoading, setIsLoading] = useState(true);

  //show/hide filters states
  const [showFolder, setShowFolder] = useState(false);
  const [showHeat, setShowHeat] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showResponsable, setShowResponsable] = useState(false);

  // Data of Folders, heat, status, responsable states
  const [foldersData, setFoldersData] = useState();
  const [heatData, setHeatData] = useState();
  const [statusData, setStatusData] = useState();
  const [responsableData, setResponsableData] = useState();

  useEffect(() => {
    const fetchFoldersData = async () => {
      console.log("token>>", token);
      console.log("server>>", server);
      const response = await axios.get(`${server}/folders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoldersData(response.data);
    };
    fetchFoldersData();
  }, [token]);

  useEffect(() => {
    const fetchResponsableData = async () => {
      const response = await axios.get(`${server}/users`);
      setResponsableData(response.data);
    };
    fetchResponsableData();
  }, [token]);

  return (
    <div>
      <section>
        <h3
          onClick={() => {
            setShowFolder(!showFolder);
          }}
        >
          Dossiers
        </h3>
        <div className={showFolder ? null : "filters-hide"}>
          {foldersData ? (
            foldersData.map((folder, index) => {
              return <p key={index}>{folder.name} toto</p>;
            })
          ) : (
            <p>Chargement en cours...</p>
          )}
          <p>Gérer les dossiers</p>
        </div>
      </section>

      <section>
        <h3 onClick={() => setShowResponsable(!showResponsable)}>
          Responsable
        </h3>
        <div className={showResponsable ? null : "filters-hide"}>
          <div>
            {responsableData ? (
              responsableData.map((responsable, index) => {
                return <p key={index}>{responsable.name}</p>;
              })
            ) : (
              <p>Chargement en cours...</p>
            )}
            <p>Responsable 1</p>
            <p>Responsable 2</p>
            <p>Responsable 3</p>
          </div>
        </div>
      </section>
      <section>
        <h3 onClick={() => setShowHeat(!showHeat)}>Chaleur</h3>
        <div className={showHeat ? null : "filters-hide"}>
          <p>Chaleur 1</p>
          <p>Chaleur 2</p>
          <p>Chaleur 3</p>
        </div>
      </section>
      <section>
        <h3 onClick={() => setShowStatus(!showStatus)}>Statut du contact</h3>
        <div className={showStatus ? null : "filters-hide"}>
          <p>Statut 1</p>
          <p>Statut 2</p>
          <p>Statut 3</p>
        </div>
      </section>
    </div>
  );
};

export default Filters;
