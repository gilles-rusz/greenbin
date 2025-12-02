import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import WastesList from "./pages/WastesList.jsx";
import WasteForm from "./pages/WasteForm.jsx";
import UsersList from "./pages/UsersList.jsx";
import UserForm from "./pages/UserForm.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wastes" element={<WastesList />} />
          <Route path="/wastes/new" element={<WasteForm />} />
          <Route path="/wastes/:id" element={<WasteForm />} />

          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<UserForm />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
