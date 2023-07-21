import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./app/context/AuthContext";
import { ProjectProvider } from "./app/context/ProjectProvider";
import Login from "./app/pages/Login";
import { HomeAdmin } from "./app/pages/HomeAdmin";

function App() {
  return (
    <BrowserRouter>
      <ProjectProvider>
        <AuthProvider>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/home-admin" element={<HomeAdmin />} />
          </Routes>
        </AuthProvider>
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;
