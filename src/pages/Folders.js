import { useState, useEffect, useRef } from "react";

// import icons
import { IonIcon } from "@ionic/react";
import { trashBin } from "ionicons/icons";

import axios from "axios";

// import the component EditFolder
import EditFolder from "../components/EditFolder";

const Folders = ({ token, server }) => {
  const [folders, setFolders] = useState("");
  const [newFolder, setNewFolder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [folderId, setFolderId] = useState("");

  // create a new folder states
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");

  //reload the page when a folder is deleted
  const [reload, setReload] = useState(false);

  //useRef to move affilates to another folder
  const folderRef = useRef();
  const affiliateRef = useRef();

  // fetching forders useEffect
  useEffect(() => {
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
      setIsLoading(false);
      setReload(false);
    } catch (error) {
      console.log("Erreur dans la récupération des dossiers :", error.data);
    }
  }, [token, newFolder, server, reload]);

  //create a new folder function
  const createFolder = async () => {
    try {
      await axios.post(
        `${server}/folder/create`,
        {
          name: newFolderName,
          description: newFolderDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewFolder(false);
    } catch (error) {
      console.log("Erreur lors de la création du dossier :", error.data);
    }
  };

  //delete a folder

  const deleteFolder = async (folderId) => {
    //confirmation message
    const confirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce dossier ?"
    );
    if (!confirm) {
      return;
    }
    //delete the folder
    try {
      await axios.delete(`${server}/folder/${folderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReload(true);
    } catch (error) {
      console.log("Erreur lors de la suppression du dossier :", error.data);
    }
  };

  //move affiliates to another folder

  const moveAffiliates = () => {
    const updateAffiliateFolder = async () => {
      try {
        await axios.patch(
          `${server}/affiliate/${affiliateRef.current}`,
          {
            contact_folder: folderRef.current,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log("Erreur lors du déplacement de l'affilié :", error.data);
      }
    };
    updateAffiliateFolder();
    setReload(true);
  };

  // function to display the number of affiliates in a folder

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="folders font">
      <div>
        <div>
          <h1>{folders.length} dossiers</h1>
          <button
            onClick={() => {
              setNewFolder(!newFolder);
            }}
          >
            {newFolder ? "Annuler" : "+ Nouveau dossier"}
          </button>
        </div>

        {newFolder ? (
          <div>
            <form onSubmit={createFolder}>
              <input
                type="text"
                placeholder="Nom du dossier"
                value={newFolderName}
                required
                onChange={(event) => {
                  setNewFolderName(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Description du dossier"
                value={newFolderDescription}
                required
                onChange={(event) => {
                  setNewFolderDescription(event.target.value);
                }}
              />
              <button>Créer le dossier</button>
            </form>
          </div>
        ) : null}

        <div id="folders-list">
          {folders &&
            folders.map((folder) => {
              return (
                <div
                  key={folder._id}
                  // set folderId to delete on mouse over
                  onMouseOver={() => {
                    setFolderId(folder._id);
                    folderRef.current = folder._id;
                  }}
                  onDrop={moveAffiliates}
                  onDragOver={(event) => {
                    event.preventDefault();
                  }}
                  onDragEnter={(e) => {
                    folderRef.current = folder._id;
                  }}
                  // set folderId to "" on mouse out
                  onMouseOut={() => {
                    setFolderId("");
                  }}
                >
                  <div>
                    <EditFolder
                      token={token}
                      server={server}
                      folderId={folder._id}
                      affiliateRef={affiliateRef}
                      folderRef={folderRef}
                      setReload={setReload}
                      reload={reload}
                    />
                  </div>
                  <div>
                    {folderId === folder._id &&
                    folderId !== "647377874977d0f948b08d71" ? (
                      <IonIcon
                        icon={trashBin}
                        style={{ color: "#b42f5a", fontSize: "20px" }}
                        onClick={() => {
                          deleteFolder(folder._id);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Folders;
