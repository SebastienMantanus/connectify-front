import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import icons
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
  destinationFolder,
  destinationUser,
  destinationStatus,
  destinationHeat,
  userToUpdate,
  setReload,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // initialize navigate
  const navigate = useNavigate();

  //show/hide filters states
  const [showFolder, setShowFolder] = useState(false);
  const [showHeat, setShowHeat] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showResponsable, setShowResponsable] = useState(false);

  // dragOver states
  const [isDragOver, setIsDragOver] = useState("");

  //#region Filters states
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
  //#endregion

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

  // handle drop folders function
  const handleFolderDrop = (e) => {
    // update user folder
    const updateUserFolder = async () => {
      await axios.patch(
        `${server}/affiliate/${userToUpdate.current}`,
        {
          contact_folder: destinationFolder.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };
    updateUserFolder();
    setReload(true);
  };

  // handle drop user function
  const handleUserDrop = (e) => {
    // update user responsable
    const updateUserResponsable = async () => {
      await axios.patch(
        `${server}/affiliate/${userToUpdate.current}`,
        {
          responsable: destinationUser.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };
    updateUserResponsable();
    setReload(true);
  };

  // handle drop status function
  const handleStatusDrop = (e) => {
    // update user status
    const updateUserStatus = async () => {
      await axios.patch(
        `${server}/affiliate/${userToUpdate.current}`,
        {
          contact_status: destinationStatus.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };
    updateUserStatus();
    setReload(true);
  };

  // handle drop heat function
  const handleHeatDrop = (e) => {
    // update user heat
    const updateUserHeat = async () => {
      await axios.patch(
        `${server}/affiliate/${userToUpdate.current}`,
        {
          contact_heat: destinationHeat.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };
    updateUserHeat();
    setReload(true);
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
            onDragOver={() => {
              setShowFolder(true);
            }}
          >
            Dossiers
          </h3>
        </div>
        <div className={showFolder ? null : "filters-hide"}>
          <p
            onClick={() => setContactFolder("")}
            className={contactFolder === "" ? "bold" : null}
            style={{ width: "100%" }}
          >
            Tous les dossiers
          </p>
          {foldersData ? (
            foldersData.map((folder) => {
              return (
                <p
                  key={folder._id}
                  className={isDragOver === folder._id ? "drag-over" : null}
                  onClick={() => {
                    setContactFolder(folder._id);
                  }}
                  onDragEnter={(e) => {
                    setIsDragOver(folder._id);
                    destinationFolder.current = folder._id;
                  }}
                  onDrop={() => {
                    setIsDragOver("");
                    handleFolderDrop();
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDragLeave={() => {
                    setIsDragOver("");
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
            onDragOver={() => {
              setShowResponsable(true);
            }}
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
                    className={isDragOver === user._id ? "drag-over" : null}
                    style={{ width: "100%" }}
                    key={index}
                    onClick={() => {
                      setResponsable(user._id);
                    }}
                    onDragEnter={(e) => {
                      setIsDragOver(user._id);
                      destinationUser.current = user._id;
                    }}
                    onDrop={() => {
                      setIsDragOver("");
                      handleUserDrop();
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDragLeave={() => {
                      setIsDragOver("");
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
            onDragOver={() => {
              setShowHeat(true);
            }}
          >
            Chaleur
          </h3>
        </div>
        <div className={showHeat ? null : "filters-hide"}>
          {heatData.map((heat, index) => {
            return (
              <p
                className={isDragOver === heat.statut_id ? "drag-over" : null}
                style={{ width: "100%" }}
                key={index}
                onClick={() => {
                  setContactHeat(heat.statut_id);
                }}
                onDragEnter={(e) => {
                  setIsDragOver(heat.statut_id);
                  destinationHeat.current = heat.statut_id;
                }}
                onDrop={() => {
                  setIsDragOver("");
                  handleHeatDrop();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDragLeave={() => {
                  setIsDragOver("");
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
            onDragOver={() => {
              setShowStatus(true);
            }}
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
                  className={isDragOver === status._id ? "drag-over" : null}
                  style={{ width: "100%" }}
                  key={index}
                  onClick={() => {
                    setContactStatus(status._id);
                  }}
                  onDragEnter={(e) => {
                    setIsDragOver(status._id);
                    destinationStatus.current = status._id;
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={() => {
                    setIsDragOver("");
                    handleStatusDrop();
                  }}
                  onDragLeave={() => {
                    setIsDragOver("");
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
