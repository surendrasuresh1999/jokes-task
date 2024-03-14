import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  // const isLoggedIn = localStorage.getItem("userData");

  return (
    <div
      className="p-3 d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
      {/* <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Route path="/login" element={<LoginPage />} />
        )}
      </Routes> */}
    </div>
  );
}

export default App;
