import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./app/context/AuthContext";
import { ProjectProvider } from "./app/context/ProjectProvider";
import Login from "./app/pages/Login";
import { TableTeacher } from "./app/pages/TableTeacher";
import { TableStudent } from "./app/pages/TableStudent";
import { config } from "./config";

function App() {
  return (
    <BrowserRouter>
      <ProjectProvider>
        <AuthProvider>
          <Routes>
            <Route index element={<Login />} />
            <Route path={config.ROUTE.ADMIN.TABLE_TEACHER} element={<TableTeacher />} />
            <Route path="/student" element={<TableStudent />} />
            {/* <Route path="/home-admin" element={<TableCouse />} /> */}
          </Routes>
        </AuthProvider>
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;
