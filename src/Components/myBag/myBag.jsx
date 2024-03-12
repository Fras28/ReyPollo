import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardsBag } from "./CardsBag/CardsB";
import  Nav  from "../Nav/Nav";
import "./myBag.css";
import {
  asyncAllProducts,
  asyncCategorias,
  asyncComercio,
  asyncOrder,
} from "../redux/slice";
import QRCode from "qrcode.react";
import ModalConfirm from "../Modal/ModalConfirmacion/ModalConfirmar";

export const BagXX = (id) => {
  const dispatch = useDispatch();

  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);

  useEffect(() => {
    if (!hasScrolledToTop) {
      window.scrollTo(0, 0);
      setHasScrolledToTop(true);
    }
  }, [hasScrolledToTop]);

  let { favProd, comercio } = useSelector((state) => state.alldata);
  const [telefono, setTelefono] = useState("");

  const pedidox = favProd.map((x) => x.attributes.name);

  let result = favProd.filter((item, index) => {
    return favProd.indexOf(item) === index;
  });

  const valores = favProd.map((e) => parseInt(e.attributes.price, 10));
  let total = valores.reduce((a, b) => a + b, 0);

  const groupedProducts = {};
  favProd.forEach((product) => {
    const key = `${product.attributes.name} - ${product.attributes.price}`;
    groupedProducts[key] = (groupedProducts[key] || 0) + 1;
  });

  const orderString = Object.entries(groupedProducts)
    .map(([productInfo, count]) => {
      const [name, price] = productInfo.split(" - ");
      return `${name} ($${price}) x${count}`;
    })
    .join(", ");

  // console.log(groupedProducts, "vamos a filtrar para q sea solo el pedido");
  const [order, setOrder] = useState({
    Order_total: total,
    Payment_type: "",
    Order: orderString,
    Name: "",
    Detail: "",
    Type_order: "",
    telefono: "291",
    Adress: "",
  });



  const sendComanda = () => {
    console.log("Comanda saliendo del componente");
    dispatch(asyncOrder(order));
  };


  const handleOrder = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const whatsappMessage = Object.entries(groupedProducts)
    .map(([productInfo, count]) => {
      const [name, price] = productInfo.split(" - ");
      return `${name} ($${price}) x${count},`;
    })
    .join(", ");

  const whatsappLink = `http://wa.me/${comercio[0]?.attributes.whatsapp}?text=Hola ${comercio[0]?.attributes.name} Mensaje de mi pedido ➤ ${whatsappMessage} Total = $ ${total}, "${order?.Payment_type}"`;

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="backBag">
      <Nav id={id.match.params.id} />
      <div className="contBag animate__animated   animate__rollIn animate__faster">
        <CardsBag products={result} />
      </div>
      <div className="boxPedido">
        <div className="boxPedido1"></div>
      </div>
    
      <ModalConfirm total={total} sendComanda={sendComanda} />
    </div>
  );
};
