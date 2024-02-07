import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import AlertDialogSlide from "../BtnNavidad/BtnNavidad";
import "./LandingStart.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncAllProducts, asyncCategorias } from "../redux/slice";

export const Inicio = (url) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Función para realizar la acción deseada
    const fetchData = () => {
      console.log("Effect is running");
      dispatch(asyncAllProducts());
      dispatch(asyncCategorias());
    };

    // Ejecutar la función inmediatamente al montar el componente
    fetchData();

    // Configurar la repetición cada 15 minutos
    const intervalId = setInterval(fetchData, 15 * 60 * 1000); // 15 minutos en milisegundos

    // Limpiar el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, [dispatch]);
  
  const toTop = ()=>{
    window.scrollTo(0,0);
  }
   toTop();

    console.log(url)
    if (url.location.pathname === "/") {
        url.location.pathname = "/sinMesa";
        console.log(url.location.pathname);
      }
 
  return (
    <div className="LandingBack">


      <NavLink to={`${url.location.pathname}`}>
          
      <div className="marcaLanging ">
      </div>
        </NavLink>
      <div className="btnEnter">

        <AlertDialogSlide/>

      
        <Link to={`${url.location.pathname}/Landing`}>
        <button className="Enter animate__animated  animate__zoomIn animate__fast" >Ver Catalogo</button>
        </Link>
     
      </div>

    </div>
  );
};
