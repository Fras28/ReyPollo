import React, { useEffect } from "react";
import { Cards } from "../Cards/Cards.jsx";
import "./Categorias.css";
import { Nav } from "../Nav/Nav.jsx";
import { useDispatch, useSelector } from "react-redux";
import { asyncAllProducts } from "../redux/slice.jsx";
import { VerPedido } from "../BtnBag/BtnBag.jsx";

import milanesas from "../assets/Pollo/milanesas.jpg"
import hamburguesas from "../assets/Pollo/hamburguesas.jpg"
import polloTrozado from "../assets/Pollo/polloTrozado.jpg"
import arrollado from "../assets/Pollo/arrollados.jpg"
import papas from "../assets/Pollo/papas.jpg"
import merluza from "../assets/Pollo/merluza.webp"
import nuggets from "../assets/Pollo/nuggets.jpg"

import Spinner from "../assets/Spinner/Spinner.jsx";
import Logo from "../assets/Logo.png"
import { CardsBag } from "../Cards/CardsBag.jsx";
import ModalConfirm from "../Modal/ModalConfirmacion/ModalConfirmar.jsx";

export const BagXX = (id) => {
  const mesa = id.match.url.slice(1, 3);
  let { favProd } = useSelector((state) => state.alldata);

  let dispatch = useDispatch();

  let { allProduct } = useSelector((state) => state.alldata);

  useEffect(() => {
    // Función para realizar la acción deseada
    const fetchData = () => {
      console.log("Effect is running BAG");
      dispatch(asyncAllProducts());
    };

    // Ejecutar la función inmediatamente al montar el componente
    fetchData();

    // Configurar la repetición cada 15 minutos
    const intervalId = setInterval(fetchData, 15 * 60 * 1000); // 15 minutos en milisegundos

    // Limpiar el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, [dispatch]);

console.log(favProd, 'productos favoritos');
const valores = favProd.map((e) => parseInt(e.attributes.price, 10));
  let total = valores.reduce((a, b) => a + b, 0);
  return (
    <div className="containerL">
      <Nav id={mesa} />
      <div className="sectioner">
     
</div>
       
      <div className="conteinerLC ">
        <div className="conteinerLB2 animate__animated  animate__zoomIn animate__faster">
          {favProd? <CardsBag products={favProd}/>:null}
       
        </div>
       {favProd.length === 0? <Spinner imageUrl={Logo}/>:null} 
      </div>
      <ModalConfirm total={total} />
    </div>
  );
};
