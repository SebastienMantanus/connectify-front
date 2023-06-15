import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  // initialize navigate
  const navigate = useNavigate();

  //show/hide filters states
  const [showFolder, setShowFolder] = useState(false);
  const [showHeat, setShowHeat] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showResponsable, setShowResponsable] = useState(false);

  // Data of Folders, heat, status, responsable states
  const [foldersData, setFoldersData] = useState();
  const heatData = [
    {
      statut_id: 0,
      statut_name: "Tous les contacts",
    },
    {
      statut_id: 1,
      statut_name: "Prospect froid",
    },
    {
      statut_id: 2,
      statut_name: "Prospect tiède",
    },
    {
      statut_id: 3,
      statut_name: "Prospect chaud",
    },
  ];

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
  }, [token, server]);

  useEffect(() => {
    const fetchResponsableData = async () => {
      const response = await axios.get(`${server}/users`);
      setResponsableData(response.data);
    };
    fetchResponsableData();
  }, [token, server]);

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
  }, [token, server]);

  // reset filters function
  const resetFilters = () => {
    setContactFolder("");
    setContactHeat("");
    setContactStatus("");
    setResponsable("");
  };

  return isLoading ? null : (
    <div>
      {/* Show reset filters button only when filters are applied */}
      {contactFolder || contactHeat || contactStatus || responsable ? (
        <section>
          <button onClick={resetFilters}>Supprimer tous les filtres</button>
        </section>
      ) : null}

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
          <p
            onClick={() => setContactFolder("")}
            className={contactFolder === "" ? "bold" : null}
          >
            Tous les dossiers
          </p>
          {foldersData ? (
            foldersData.map((folder, index) => {
              return (
                <p
                  className={folder._id === contactFolder ? "bold" : null}
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
          <p onClick={() => navigate("/folders")}>Gérer les dossiers</p>
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
            <p
              onClick={() => setResponsable("")}
              className={responsable === "" ? "bold" : null}
            >
              Tous les responsables
            </p>
            {responsableData ? (
              responsableData.map((user, index) => {
                return (
                  <p
                    className={user._id === responsable ? "bold" : null}
                    key={index}
                    onClick={() => {
                      setResponsable(user._id);
                    }}
                  >
                    {user.name}
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
                className={heat.statut_id === contactHeat ? "bold" : null}
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
          <p
            onClick={() => setContactStatus("")}
            className={contactStatus === "" ? "bold" : null}
          >
            Tous les status
          </p>
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
