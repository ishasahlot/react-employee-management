import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import List from "./Pages/List";
import Details from "./Pages/Details";
import PhotoResult from "./Pages/PhotoResult";

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