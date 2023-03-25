import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Fontawsome import
import { library } from "@fortawesome/fontawesome-svg-core";
import {
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
import Newcontact from "./pages/Newcontact";

// //import cookies
// import Cookies from "js-cookie";

function App() {
  const [token, SetToken] = useState("");
  library.add(faCircleCheck, faRightFromBracket, faPenToSquare, faCheckSquare);

  return (
    <div className="App">
      <Router>
        <Header token={token} SetToken={SetToken} />
        <Routes>
          <Route
            path="/"
            element={<Login token={token} SetToken={SetToken} />}
          />
          <Route
            path="/home"
            element={<Home token={token} SetToken={SetToken} />}
          />
          <Route path="/contact/:id" element={<Contact token={token} />} />

          <Route path="/contact/edition" element={<Edition />} />

          <Route
            path="/contact/create"
            element={<Newcontact token={token} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
