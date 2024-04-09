import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import AlertDialogSlide from "../BtnNavidad/BtnNavidad";
import "./LandingStart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAllProducts,
  asyncCategorias,
  asyncComercio,
} from "../redux/slice";
import { ButtonEnter } from "./ButtonEnter/ButtonEnter";
import CtaDNI from "../assets/BaneDNI.png";

export const Inicio = (url) => {
  const dispatch = useDispatch();
  const [animateOut, setAnimateOut] = useState(false);
const Location = <svg width="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M82.359 63.059H59.031L71.279 37.749L73.301 33.566C73.544 32.914 73.763 32.25 73.952 31.574C74.547 29.444 74.888 27.208 74.888 24.887C74.888 11.143 63.743 0 49.998 0C36.253 0 25.109 11.143 25.109 24.887C25.109 27.207 25.451 29.443 26.046 31.574C26.234 32.25 26.453 32.914 26.696 33.566L28.719 37.748L40.964 63.059H17.638L0 100H99.999L82.359 63.059ZM49.999 15.983C54.916 15.983 58.906 19.971 58.906 24.887C58.906 29.807 54.917 33.792 49.999 33.792C45.081 33.792 41.094 29.805 41.094 24.887C41.094 19.971 45.081 15.983 49.999 15.983ZM35.871 72.191C40.057 72.76 42.515 75.681 45.526 79.308C50.311 85.069 56.266 92.241 72.155 92.241C81.872 92.241 87.822 90.476 89.881 87.001L94.404 96.472H35.871V72.191ZM83.94 74.558C77.752 74.573 70.854 74.516 67.468 71.138C66.304 69.974 65.655 68.462 65.452 66.585H80.137L83.94 74.558ZM49.999 81.727L57.326 66.586H63.694C63.92 68.941 64.741 70.906 66.223 72.388C69.955 76.113 76.808 76.323 83.116 76.323C83.527 76.323 83.934 76.323 84.339 76.323L84.784 76.321L88.845 84.825C88.788 85.136 88.705 85.445 88.565 85.746C87.572 87.906 83.919 90.478 72.158 90.478C57.098 90.478 51.672 83.946 46.887 78.181C43.822 74.493 40.888 71.025 35.875 70.432V66.587H42.676L49.999 81.727ZM19.862 66.586H34.108V70.315C26.408 70.376 22.93 72.998 20.135 75.117C18.295 76.51 16.781 77.645 14.443 77.939L19.862 66.586ZM13.57 79.763C17.018 79.663 19.058 78.142 21.199 76.523C23.917 74.463 27.011 72.142 34.108 72.085V96.472H5.593L13.57 79.763Z" fill="red"/>
</svg>

  const toTop = () => {
    window.scrollTo(0, 0);
  };

  toTop();

  const handleButtonClick = () => {
    // Realiza la lógica necesaria antes de la redirección
    setAnimateOut(true);

    // Espera un tiempo suficiente para que la animación ocurra antes de redirigir
    setTimeout(() => {
      url.history.push(`${url.location.pathname}/Landing`);
    }, 500); // Ajusta este tiempo según la duración de la animación
  };

  if (url.location.pathname === "/") {
    url.location.pathname = "/sinMesa";
    console.log(url.location.pathname);
  }

  return (
    <div
      className={`LandingBack ${
        animateOut ? "animate__animated animate__slideOutUp" : ""
      }`}
    >
      <div className="landingStart">
      
<div style={{width:"100%"}}> <p className="titleSection" style={{justifyContent:"center", outline:"solid white 2px", border:"none"}} >Consulta por nuestros desayunos y meriendas libres</p> </div>
        <div className="BottomLanding">
          <div style={{paddingTop:"5rem"}}>
            <AlertDialogSlide />
       
          </div>
       
          <div className="btnEnter" onClick={handleButtonClick}>
      
            {/* <ButtonEnter titulo="Ver Catalogo" /> */}
          <button className="Btn" />
          <a style={{ fontWeight:"600", fontSize:"20px"}} href="https://www.google.com/maps/dir//DIRECCION+cafe+madre/@-38.7186808,-62.3059703,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x95edbd007363273b:0x236c527b644bb0b!2m2!1d-62.264685!2d-38.718755?entry=ttu" target="_blank">{Location} Alsina 23</a>
          </div>
   
  
        </div>
        <Link to="/Comander" className="buttonComander">
              Ir a Comander
            </Link>
      </div>
    </div>
  );
};
