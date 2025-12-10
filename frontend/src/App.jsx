import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import WastesList from "./pages/WastesList.jsx";
import WasteForm from "./pages/WasteForm.jsx";
import UsersList from "./pages/UsersList.jsx";
import UserForm from "./pages/UserForm.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LayoutWithNavbar from "./components/LayoutWithNavbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Page login (sans navbar) */}
        <Route path="/" element={<Login />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute />}>
          
          {/* Layout avec Navbar */}
          <Route element={<LayoutWithNavbar />}>
            
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Déchets */}
            <Route path="/wastes" element={<WastesList />} />
            <Route path="/wastes/new" element={<WasteForm />} />
            <Route path="/wastes/edit/:id" element={<WasteForm />} />

            {/* Utilisateurs */}
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
          
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;


