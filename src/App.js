import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Fontawsome import
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

//import dependencies
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Edition from "./pages/Edition";

// //import cookies
// import Cookies from "js-cookie";

function App() {
  const [token, SetToken] = useState("");
  library.add(faRightFromBracket);

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
          <Route path="/Contact/id:" element={<Contact />} />
          <Route path="/Contact/edition" element={<Edition />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
