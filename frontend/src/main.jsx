import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./style/variables-et-reset.css";
import "./style/global-layout.css";
import "./style/components.css";

import "./style/login.css";
import "./style/dashboard.css";
import "./style/user-list.css";
import "./style/user-form.css";
import "./style/wastes-list.css";
import "./style/waste-form.css";

import "./style/animations.css";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
