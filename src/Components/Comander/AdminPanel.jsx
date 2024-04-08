import React, { useState } from "react";

import Dashboard from "./DashBoard/DashBoard"
import ComandasComponent from "./General/Comander";
import ModalGen from "../Modal/ModalConfirmacion/Modal";
import { Editer } from "../Categorias/Editer";
import { useSelector } from "react-redux";
import LoginComponent from "./LogIn/LogIn";


export const AdminPanel = () => {
  const [panel, setPanel] = useState("General");
  const { usuarioComander } = useSelector((state) => state.alldata);
  
  return (
    <>
      {usuarioComander?
        <div>
          <div style={{padding:"1rem",display:"flex", justifyContent:"center" ,gap:"1rem"}}>
          <button className="buttonDash" onClick={() => setPanel("General")}>General</button>
          <button className="buttonDash" onClick={() => setPanel("Estadisticas")}>Estadisticas</button>
          <button className="buttonDash" onClick={() => setPanel("Otros")}>Otros</button>
          <ModalGen Child={<Editer />} txtBtn="Editar Producto"  />
          </div>
          
          {/* Aquí puedes renderizar el panel según el estado "panel" */}
          {panel === "General" && <ComandasComponent />}
          {panel === "Estadisticas" && <Dashboard />}
          {panel === "Otros" && <Dashboard />}
        </div>:<LoginComponent />
      }
    </>
  );
};
