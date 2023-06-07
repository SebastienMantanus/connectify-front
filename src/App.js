import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Edition from "./pages/Edition";
import Createcontact from "./pages/Createcontact";

//switch between local and distant server

const server = "http://localhost:3000";

// //import cookies
// import Cookies from "js-cookie";

function App() {
  const [token, SetToken] = useState("");
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
              <Login token={token} SetToken={SetToken} server={server} />
            }
          />
          <Route
            path="/home"
            element={<Home token={token} SetToken={SetToken} server={server} />}
          />
          <Route
            path="/contact/:id"
            element={<Contact token={token} server={server} />}
          />

          <Route
            path="/contact/:id/edition"
            element={<Edition token={token} server={server} />}
          />

          <Route
            path="/contact/createv2"
            element={<Createcontact token={token} server={server} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
