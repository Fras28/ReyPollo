import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Comander.css";
import { asyncComandas, asyncGetProv, asyncPedidoRealizado } from "../../redux/slice";
import LogIn from "../../BtnNavidad/LogIn";
import FormularioVenta from "../formVenta/formVenta";
import { Editer } from "../../Categorias/Editer";
import LoginComponent from "../LogIn/LogIn.jsx";
import SoloComandas from "./SoloComandas.jsx";
import FormularioGastos from "../formVenta/formGastos";
import ApexCharts from 'apexcharts';
import ModalGen from "../../Modal/ModalConfirmacion/Modal.jsx";
import EditProduct from "../formVenta/formEditProd.jsx";

const ComandasComponent = () => {
  const dispatch = useDispatch();
  const { comandas, comandasTrue, comandasFalse, usuarioComander } =
    useSelector((state) => state.alldata);
  const [loadingComandas, setLoadingComandas] = useState([]);
  
  useEffect(() => {
    const obtenerComandas = async () => {
      try {
        await dispatch(asyncComandas());
        await dispatch(asyncGetProv());
      } catch (error) {
        console.error("Error al obtener comandas:", error);
      }
    };
  
    if (usuarioComander) {
      obtenerComandas();
    }
  
  }, [!usuarioComander, comandas, comandasTrue, comandasFalse, dispatch]);
  

 
  return (
    <div className="comandas-container">
      {/* Mostrar el componente LoginComponent solo si el usuario no está autenticado */}
      {!usuarioComander && <LoginComponent />}
      <div className="cont1">
        <h2 className="titleEditor">Movimientos</h2>
        <FormularioVenta />
        <FormularioGastos/>
  
     
      </div>
      <div className="cont2">
        <SoloComandas/>
      </div>
    </div>
  );
};

export default ComandasComponent;
