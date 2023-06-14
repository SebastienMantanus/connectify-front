import axios from "axios";
import { useState, useEffect } from "react";

//import icons assets
import heat0 from "../assets/images/heat_0.png";
import heat1 from "../assets/images/heat_1.png";
import heat2 from "../assets/images/heat_2.png";
import heat3 from "../assets/images/heat_3.png";
import statusIco from "../assets/images/status_ico.png";
import resposableIco from "../assets/images/responsable_ico.png";

import folderIco from "../assets/images/folder_ico.png";
// import responsableIco from "../assets/images/responsable_ico.png";

const QuickUpdate = ({ server, id, token, setToUpdate }) => {
  //  useStates for status, forders, and heat
  const [status, setStatus] = useState("");
  const [folders, setFolders] = useState("");
  const [responsable, setResponsable] = useState("");

  // useStates for affiliates status, folders, and heat
  const [affStatus, setAffStatus] = useState("");
  const [affFolders, setAffFolders] = useState("");
  const [affHeat, setAffHeat] = useState(0);
  const [affResponsable, setAffResponsable] = useState("");

  // fetching status, forders and Affiliate data

  useEffect(() => {
    // fetching status
    try {
      const fetchStatus = async () => {
        const response = await axios.get(`${server}/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatus(response.data);
      };
      fetchStatus();
    } catch (error) {
      console.log("Erreur dans la récupération des status :", error.data);
    }

    // fetching forders
    try {
      const fetchFolders = async () => {
        const response = await axios.get(`${server}/folders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFolders(response.data);
      };
      fetchFolders();
    } catch (error) {
      console.log("Erreur dans la récupération des folders :", error.data);
    }

    // fetching responsables
    try {
      const fetchResponsable = async () => {
        const response = await axios.get(`${server}/users`);
        setResponsable(response.data);
      };
      fetchResponsable();
    } catch (error) {
      console.log("Erreur dans la récupération des responsables :", error.data);
    }

    // fetching affiliate status, folders, and heat
    try {
      const fetchAffData = async () => {
        const response = await axios.get(`${server}/affiliate/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAffStatus(response.data.contact_status);
        setAffFolders(response.data.contact_folder);
        setAffHeat(response.data.contact_heat);
        setAffResponsable(response.data.responsable);
      };
      fetchAffData();
    } catch (error) {
      console.log(
        "Erreur dans la récupération des données de l'affilié :",
        error.data
      );
    }
  }, [server, id, token, affHeat]);

  // fuction to display heat selector menu
  const displayHeat = (heat) => {
    switch (heat) {
      case 0:
        return (
          <>
            <option value="0" selected>
              Aucun
            </option>
            <option value="1">Froid</option>
            <option value="2">Tiède</option>
            <option value="3">Chaud</option>;
          </>
        );
      case 1:
        return (
          <>
            <option value="0">Aucun</option>
            <option value="1" selected>
              Froid
            </option>
            <option value="2">Tiède</option>
            <option value="3">Chaud</option>;
          </>
        );

      case 2:
        return (
          <>
            <option value="0">Aucun</option>
            <option value="1">Froid</option>
            <option value="2" selected>
              Tiède
            </option>
            <option value="3">Chaud</option>;
          </>
        );

      case 3:
        return (
          <>
            <option value="0">Aucun</option>
            <option value="1">Froid</option>
            <option value="2">Tiède</option>
            <option value="3" selected>
              Chaud
            </option>
            ;
          </>
        );

      default:
        return (
          <>
            <option value="0" selected>
              Aucun
            </option>
            <option value="1">Froid</option>
            <option value="2">Tiède</option>
            <option value="3">Chaud</option>;
          </>
        );
    }
  };

  // switch case to display heat icon
  const displayHeatIcon = (heat) => {
    switch (heat) {
      case 0:
        return <img src={heat0} alt="contact heat" />;
      case 1:
        return <img src={heat1} alt="contact heat" />;
      case 2:
        return <img src={heat2} alt="contact heat" />;
      case 3:
        return <img src={heat3} alt="contact heat" />;
      default:
        return <img src={heat0} alt="contact heat" />;
    }
  };

  // fuction to change Affiliate heat
  const changeHeat = async (heat) => {
    try {
      await axios.patch(
        `${server}/affiliate/${id}`,
        {
          contact_heat: heat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToUpdate(true);
    } catch (error) {
      console.log("Erreur dans la modification de la chaleur :", error.data);
    }
  };

  // fuction to change Affiliate status
  const changeStatus = async (status) => {
    try {
      await axios.patch(
        `${server}/affiliate/${id}`,
        {
          contact_status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToUpdate(true);
    } catch (error) {
      console.log("Erreur dans la modification du status :", error.data);
    }
  };

  // fuction to change Affiliate folder
  const changeFolder = async (folder) => {
    try {
      await axios.patch(
        `${server}/affiliate/${id}`,
        {
          contact_folder: folder,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToUpdate(true);
    } catch (error) {
      console.log("Erreur dans la modification du dossier :", error.data);
    }
  };

  // fuction to change Affiliate responsable
  const changeResponsable = async (responsable) => {
    try {
      await axios.patch(
        `${server}/affiliate/${id}`,
        {
          responsable: responsable,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToUpdate(true);
    } catch (error) {
      console.log("Erreur dans la modification du responsable :", error.data);
    }
  };

  return (
    <div className="quick-update">
      <div>
        {displayHeatIcon(affHeat)}
        <select
          defaultValue={1}
          onChange={(event) => {
            const heat = event.target.value;
            setAffHeat(heat);
            changeHeat(heat);
          }}
        >
          {displayHeat(affHeat)}
        </select>
      </div>
      <div>
        <img src={statusIco} alt="status icon" />
        <select
          defaultValue={affStatus._id}
          onChange={(event) => {
            const status = event.target.value;
            setAffStatus(status);
            changeStatus(status);
          }}
        >
          {status &&
            status.map((status) => {
              const currentID = affStatus._id;
              if (currentID === status._id) {
                return (
                  <option key={status._id} value={status._id} selected>
                    {status.status_name}
                  </option>
                );
              }
              return <option value={status._id}>{status.status_name}</option>;
            })}
        </select>
      </div>
      <div>
        <img src={folderIco} alt="folder icon" />
        <select
          defaultValue={affFolders._id}
          onChange={(event) => {
            const folder = event.target.value;
            setAffFolders(folder);
            changeFolder(folder);
          }}
        >
          {folders &&
            folders.map((folder) => {
              if (folder._id === affFolders._id) {
                return (
                  <option key={folder._id} value={folder._id} selected>
                    {folder.name}
                  </option>
                );
              }
              return <option value={folder._id}>{folder.name}</option>;
            })}
        </select>
      </div>
      <div>
        <img src={resposableIco} alt="responsable icon" />
        <select
          defaultValue={affResponsable._id}
          onChange={(event) => {
            const responsable = event.target.value;
            setAffResponsable(responsable);
            changeResponsable(responsable);
          }}
        >
          {responsable &&
            responsable.map((responsable) => {
              const currentID = affResponsable._id;
              if (currentID === responsable._id) {
                return (
                  <option
                    key={responsable._id}
                    value={responsable.name}
                    selected
                  >
                    {responsable.name}
                  </option>
                );
              }
              return (
                <option value={responsable._id}>{responsable.name}</option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default QuickUpdate;
