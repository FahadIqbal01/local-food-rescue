import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../src/pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/Donor/DonorDashboard";
import RecipientDashboard from "./pages/Recipient/RecipientDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProfileSettings from "./pages/ProfileSettings";
import VerifyAccount from "./pages/VerifyAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor" element={<DonorDashboard />} />
        <Route path="/recipient" element={<RecipientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<ProfileSettings role="recipient" />} />
        <Route path="/verify" element={<VerifyAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
