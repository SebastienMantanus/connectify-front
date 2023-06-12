import { useEffect, useState } from "react";

import { IonIcon } from "@ionic/react";
import { peopleOutline } from "ionicons/icons";
import { folderOpenOutline } from "ionicons/icons";
import { flameOutline } from "ionicons/icons";
import { playForwardOutline } from "ionicons/icons";

import axios from "axios";

const Filters = ({
  token,
  server,
  contactFolder,
  setContactFolder,
  responsable,
  setResponsable,
  contactHeat,
  setContactHeat,
  contactStatus,
  setContactStatus,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  //show/hide filters states
  const [showFolder, setShowFolder] = useState(false);
  const [showHeat, setShowHeat] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showResponsable, setShowResponsable] = useState(false);

  // Data of Folders, heat, status, responsable states
  const [foldersData, setFoldersData] = useState();
  const [heatData, setHeatData] = useState([
    {
      statut_id: 0,
      statut_name: "aucune",
    },
    {
      statut_id: 1,
      statut_name: "froid",
    },
    {
      statut_id: 2,
      statut_name: "tiède",
    },
    {
      statut_id: 3,
      statut_name: "chaud",
    },
  ]);
  const [statusData, setStatusData] = useState();
  const [responsableData, setResponsableData] = useState();

  useEffect(() => {
    const fetchFoldersData = async () => {
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

  useEffect(() => {
    const fetchStatusData = async () => {
      const response = await axios.get(`${server}/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatusData(response.data);
    };
    fetchStatusData();
    setIsLoading(false);
  }, [token]);

  return (
    <div>
      <section>
        <div id="menu-title">
          <IonIcon icon={folderOpenOutline} style={{ color: "#b42f5a" }} />
          <h3
            className={showFolder ? "bold" : null}
            onClick={() => {
              setShowFolder(!showFolder);
            }}
          >
            Dossiers
          </h3>
        </div>
        <div className={showFolder ? null : "filters-hide"}>
          <p onClick={() => setContactFolder("")}>Tous les dossiers</p>
          {foldersData ? (
            foldersData.map((folder, index) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    setContactFolder(folder._id);
                  }}
                >
                  {folder.name}
                </p>
              );
            })
          ) : (
            <p>Chargement en cours...</p>
          )}
          <p>Gérer les dossiers</p>
        </div>
      </section>

      <section>
        <div id="menu-title">
          <IonIcon icon={peopleOutline} style={{ color: "#b42f5a" }} />
          <h3
            className={showResponsable ? "bold" : null}
            onClick={() => setShowResponsable(!showResponsable)}
          >
            Responsable
          </h3>
        </div>

        <div className={showResponsable ? null : "filters-hide"}>
          <div>
            <p onClick={() => setResponsable("")}>Tous les responsables</p>
            {responsableData ? (
              responsableData.map((responsable, index) => {
                return (
                  <p
                    key={index}
                    onClick={() => {
                      setResponsable(responsable._id);
                    }}
                  >
                    {responsable.name}
                  </p>
                );
              })
            ) : (
              <p>Chargement en cours...</p>
            )}
          </div>
        </div>
      </section>
      <section>
        <div id="menu-title">
          <IonIcon icon={flameOutline} style={{ color: "#b42f5a" }} />
          <h3
            className={showHeat ? "bold" : null}
            onClick={() => setShowHeat(!showHeat)}
          >
            Chaleur
          </h3>
        </div>
        <div className={showHeat ? null : "filters-hide"}>
          {heatData.map((heat, index) => {
            return (
              <p
                key={index}
                onClick={() => {
                  setContactHeat(heat.statut_id);
                }}
              >
                {heat.statut_name}
              </p>
            );
          })}
        </div>
      </section>
      <section>
        <div id="menu-title">
          <IonIcon icon={playForwardOutline} style={{ color: "#b42f5a" }} />
          <h3
            className={showStatus ? "bold" : null}
            onClick={() => setShowStatus(!showStatus)}
          >
            Statut du contact
          </h3>
        </div>
        <div className={showStatus ? null : "filters-hide"}>
          <p onClick={() => setContactStatus("")}>Tous les status</p>
          {statusData ? (
            statusData.map((status, index) => {
              return (
                <p
                  className={status._id === contactStatus ? "bold" : null}
                  key={index}
                  onClick={() => {
                    setContactStatus(status._id);
                  }}
                >
                  {status.status_name}
                </p>
              );
            })
          ) : (
            <p>Chargement en cours...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Filters;
