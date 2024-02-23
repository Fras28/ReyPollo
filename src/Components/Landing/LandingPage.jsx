import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

import comidas from "../assets/PolloArt.jpg";
import Almacen from "../assets/LogoCoqui.png";
import bebidas from "../assets/bebidas.webp";
import NYEShanti from "../assets/NYEShanti.webp";
import TrackClubIMG from "../assets/TrackClub.webp";
import Logo from "../assets/LogoCoqui.png"
import { VerPedido } from "../BtnBag/BtnBag";
import AlertDialogSlide from "../BtnNavidad/BtnNavidad";
import { useDispatch, useSelector } from "react-redux";
import { asyncAllProducts } from "../redux/slice";

export default function LandingPage(url) {
  const dispatch = useDispatch();
  useEffect(() => {
    // Función para realizar la acción deseada
    const fetchData = () => {
      console.log("Effect is running");
      dispatch(asyncAllProducts());
    };

    // Ejecutar la función inmediatamente al montar el componente
    fetchData();

    // Configurar la repetición cada 15 minutos
    const intervalId = setInterval(fetchData, 15 * 60 * 1000); // 15 minutos en milisegundos

    // Limpiar el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, [dispatch]);
  const id = url.location.pathname.slice(1,3)
  const { categorias } = useSelector((state) => state.alldata);


  return (
    <div className="animate__animated  animate__zoomIn">
      <div className="naviLanding titCasa ">
        <div className="logoL">
          <NavLink to={`/${id}`} >
        <img src={Logo} alt="" width="150px"/>
          </NavLink>
        </div>
        <div className="navi2">
          <svg
            width="59"
            height="2"
            viewBox="0 0 59 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M59 0.999995L0 1" stroke="#E88A23" />
          </svg>
          <p className="naviTit2"> Nuesto Menú </p>
          <svg
            width="59"
            height="2"
            viewBox="0 0 59 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M59 0.999995L0 1" stroke="#E88A23" />
          </svg>
        </div>
      </div>

      <div className="conteinerLB2  ">
        <div className="rowsCardL">
          <NavLink
            className="navLink"
            to={
              url.location.pathname === "/"
                ? `/Cafeteria`
                : `${url.location.pathname}/Polleria`
            }
          >
            <div className="titInicio">
              <img src={comidas} alt="fotito" />
              <p>{categorias[0]?.attributes?.name}</p>
            </div>
          </NavLink>
          <NavLink className="navLink" to={`${url.location.pathname}/Comidas`}>
            <div className="titInicio">
              <img src={Almacen} alt=""/>
              <p>Almacen</p>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="navi2">
        <svg
          width="59"
          height="2"
          viewBox="0 0 59 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M59 0.999995L0 1" stroke="#E88A23" />
        </svg>
        <p className="naviTit2"> Seguinos en </p>
        <svg
          width="59"
          height="2"
          viewBox="0 0 59 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M59 0.999995L0 1" stroke="#E88A23" />
        </svg>
      </div>
      <VerPedido id={url.location.pathname.slice(1,3)}/>
    </div>
  );
}
