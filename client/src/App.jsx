import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route
            path="campaigns"
            element={<Campaigns />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="customers"
            element={<Customers />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
