import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";

import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/error";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;