import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// //import cookies
import Cookies from "js-cookie";

// Fontawsome import
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleRight,
  faRightFromBracket,
  faPenToSquare,
  faCheckSquare,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

//import dependencies
import Header from "./components/Header";
import Footer from "./components/Footer";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import Edition from "./pages/Edition";
import Createcontact from "./pages/Createcontact";
import Folders from "./pages/Folders";
import NewUser from "./pages/NewUser";

//switch between local and distant server

// const server = "http://localhost:3000";

const server = "https://site--connectify-back--6cc8ffpxkbwr.code.run";

function App() {
  const [token, SetToken] = useState(Cookies.get("token") || "");

  library.add(
    faAngleRight,
    faCircleCheck,
    faRightFromBracket,
    faPenToSquare,
    faCheckSquare
  );

  return (
    <div className="App">
      <Router>
        <Header token={token} SetToken={SetToken} />
        <Routes>
          <Route
            path="/"
            element={
              <Connexion token={token} SetToken={SetToken} server={server} />
            }
          />
          <Route
            path="/home"
            element={<Home token={token} SetToken={SetToken} server={server} />}
          />

          <Route
            path="/contact/:id/edit"
            element={<Edition token={token} server={server} />}
          />

          <Route
            path="/contact/createv2"
            element={<Createcontact token={token} server={server} />}
          />

          <Route
            path="/folders"
            element={<Folders token={token} server={server} />}
          />
          <Route path="/newuser/:id" element={<NewUser server={server} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
