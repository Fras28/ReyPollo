// ComandasComponent.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Comander.css";
import { asyncComandas, asyncPedidoRealizado } from "../redux/slice";
import LogIN from "../BtnNavidad/LogIn";
import LogIn from "../BtnNavidad/LogIn";

const ComandasComponent = () => {
  const dispatch = useDispatch();
  const { comandas,comandasTrue,comandasFalse, usuarioComander } = useSelector((state) => state.alldata);
  const [loadingComandas, setLoadingComandas] = useState([]);


  useEffect(() => {
    const obtenerComandas = async () => {
      try {
        await dispatch(asyncComandas());
      } catch (error) {
        console.error("Error al obtener comandas:", error);
      }
    };

    if (usuarioComander) {
      obtenerComandas();
    }

    const intervalId = setInterval(() => {
      obtenerComandas();
    }, 15000);

    return () => clearInterval(intervalId);
  }, [!usuarioComander, dispatch]);


  const HandleEntrega = async (comanda) => {
    // Actualiza el estado de carga para la comanda correspondiente
    setLoadingComandas((prevLoadingComandas) => [...prevLoadingComandas, comanda.attributes.id]);

    try {
      await dispatch(asyncPedidoRealizado(comanda));
    } finally {
      // Elimina la comanda del estado de carga una vez que la operación se ha completado
      setLoadingComandas((prevLoadingComandas) =>
        prevLoadingComandas.filter((id) => id !== comanda.attributes.id)
      );
    }
  };

  return (
    <div className="comandas-container">
      <LogIn />
      <h2 className="comandas-title">Comandas en Tiempo Real</h2>
      <h3>Total de pedidos {comandas.length}</h3>
      <h3>
        Pedidos realizados{" "}
        {
          comandasTrue.length
        }{" "}
        | Pedido sin entregar{" "}
        {
        comandasFalse.length
        }
      </h3>
      <ul className="comandas-list">
        {comandasFalse.map((comanda) => (
          <li key={comanda.attributes.id} className="comanda-item">
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="customer-name">
                {comanda.attributes.createdAt}
              </label>
              <label className="comanda-label" htmlFor="customer-name">
                Nombre del Cliente:
              </label>
              <span className="comanda-value">{comanda.attributes.Name}</span>
            </div>
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="phone">
                Teléfono:
              </label>
              <span className="comanda-value">{comanda.attributes.Phone}</span>
              {comanda.attributes.domicilio ? (
                <>
                  <label className="comanda-label" htmlFor="phone">
                    Direccion:
                  </label>
                  <span className="comanda-value">
                    {comanda.attributes.domicilio}
                  </span>
                </>
              ) : (
                <label className="comanda-label" htmlFor="phone">
                  -- Take Way
                </label>
              )}
            </div>
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="pedido">
                Pedido:
              </label>
              <div className="pedido-items">
                {comanda.attributes.pedido.split(",").map((item, index) => (
                  <div key={index} className="pedido-item">
                    {item.trim()}
                  </div>
                ))}
              </div>
            </div>
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="pedido-total">
                Total:
              </label>
              <span className="comanda-value">
                ${comanda.attributes.pedido_total}
              </span>
            </div>
            <div className="comanda-details" backgroundColor="green">
              {loadingComandas.includes(comanda.attributes.id) ? (
                <div className="spinner">Cargando...</div>
              ) : comanda.attributes.entregado ? (
                <button className="BtnComander" onClick={() => HandleEntrega(comanda)}>
                  Regenerate
                </button>
              ) : (
                <button className="BtnComander2" onClick={() => HandleEntrega(comanda)}>
                  Entregado
                </button>
              )}
            </div>
          </li>
        ))}
             {comandasTrue.map((comanda) => (
          <li key={comanda.attributes.id} className="comanda-item">
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="customer-name">
                {comanda.attributes.createdAt}
              </label>
              <label className="comanda-label" htmlFor="customer-name">
                Nombre del Cliente:
              </label>
              <span className="comanda-value">{comanda.attributes.Name}</span>
            </div>
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="phone">
                Teléfono:
              </label>
              <span className="comanda-value">{comanda.attributes.Phone}</span>
              {comanda.attributes.domicilio ? (
                <>
                  <label className="comanda-label" htmlFor="phone">
                    Direccion:
                  </label>
                  <span className="comanda-value">
                    {comanda.attributes.domicilio}
                  </span>
                </>
              ) : (
                <label className="comanda-label" htmlFor="phone">
                  -- Take Way
                </label>
              )}
            </div>
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="pedido">
                Pedido:
              </label>
              <div className="pedido-items">
                {comanda.attributes.pedido.split(",").map((item, index) => (
                  <div key={index} className="pedido-item">
                    {item.trim()}
                  </div>
                ))}
              </div>
            </div>
            <div className="comanda-details">
              <label className="comanda-label" htmlFor="pedido-total">
                Total:
              </label>
              <span className="comanda-value">
                ${comanda.attributes.pedido_total}
              </span>
            </div>
            <div className="comanda-details" backgroundColor="green">
              {comanda.attributes.entregado ? (
                <button
                  className="BtnComander"
                  onClick={() => HandleEntrega(comanda)}
                >
                  Regenerate
                </button>
              ) : (
                <button
                  className="BtnComander2"
                  onClick={() => HandleEntrega(comanda)}
                >
                  Entregado
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComandasComponent;
