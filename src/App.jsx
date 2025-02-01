import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirebaseAuthentication from "./components/FirebaseAuthentication";
import Home from "./components/Home";
import { gapi } from "gapi-script";
import "./App.css";


const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DISCOVERY_DOCS = [import.meta.env.VITE_DISCOVERY_DOCS];
const SCOPES = import.meta.env.VITE_SCOPES;

function App() {
  useEffect(() => {
    const initGoogleAPI = () => {
      if (!gapi.auth2.getAuthInstance()) {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            console.log("Google API initialized successfully");
          })
          .catch((error) => {
            console.error("Error initializing Google API:", error);
          });
      } else {
        console.log("Google API already initialized.");
      }
    };

    gapi.load("client:auth2", initGoogleAPI);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirebaseAuthentication />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
