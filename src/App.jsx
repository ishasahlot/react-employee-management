import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Details from "./pages/Details";
import PhotoResult from "./pages/PhotoResult";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/list"
        element={
          localStorage.getItem("isLoggedIn") === "true" ? (
            <List />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/details"
        element={
          localStorage.getItem("isLoggedIn") === "true" ? (
            <Details />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/photo-result"
        element={
          localStorage.getItem("isLoggedIn") === "true" ? (
            <PhotoResult />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;