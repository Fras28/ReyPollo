import React, { useLayoutEffect, useState } from "react";
import "./formVenta.css";
import { useDispatch } from "react-redux";
import { asyncOrder } from "../../redux/slice";

const FormularioVenta = () => {
  const dispatch = useDispatch();
  const [statusOrder, setStatusOrder] = useState(1);
  const [order, setOrder] = useState({
    total_pedido: 0,
    metodo_de_pago: "",
    pedido: "Venta Local",
    name: "",
    Detail: "",
    tipo_pedido: "LOCAL",
    telefono: "LOCAL",
    domicilio: "LOCAL",
  });

  const handleOrder = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const sendComanda = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del enlace

    try {
      // Aquí colocas la lógica para enviar la comanda
      const response = await dispatch(asyncOrder(order));

      // Actualizar el estado para indicar que la orden se envió correctamente
      setStatusOrder(3);

      // Redirigir al usuario a WhatsApp si la comanda se envió correctamente
      console.log("Comanda enviada correctamente:", response);

      // Establecer un temporizador para volver a establecer el estado a 1 después de 2 segundos
      setTimeout(() => {
        setStatusOrder(1);
      }, 2000); // 2000 milisegundos = 2 segundos
    } catch (error) {
      console.error("Error al enviar la comanda:", error);
      // Actualizar el estado para indicar que hubo un error al enviar la orden
      setStatusOrder(2);
    }
  };


  return (
    <form onSubmit={sendComanda} className="Formix1 ">
      <h2>Ventas</h2>
      <div className="divCajaBlack">
        <label className="labelCaja labelCaja1 " htmlFor="totalVenta">
          Importe:
        </label>
        <div className="inputWrapper">
          <input
            type="number"
            name="total_pedido"
            id="totalVenta"
            value={order.total_pedido}
            onChange={handleOrder}
            required
            className="Finput inputOrbitron "
            inputmode="numeric"
            placeholder="...0"
            dir="rtl" // Añade esta línea para mover el número inicial a la derecha
          />

          <span className="placeholder">Escriba aquí</span>
        </div>
      </div>
      <div className="divCajaBlack">
        <label className="labelCaja" htmlFor="metodo_de_pago">
          Metodo de pago:
        </label>
        <select
          className="Fselect"
          id="metodo_de_pago"
          name="metodo_de_pago"
          value={order.metodo_de_pago}
          onChange={handleOrder}
          required
        >
          <option value="">Seleccionar método de pago</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Qr">Qr</option>
          <option value="Cuenta DNI">Cuenta DNI</option>
          <option value="MercadoPago">MercadoPago </option>
          <option value="Modo">Modo</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Otros">Otros</option>
        </select>
      </div>
      <div className="divCajaBlack">
        <label className="labelCaja" htmlFor="name">
          Cajero/a:
        </label>
        <input
          type="text"
          className="Finput"
          id="name"
          value={order.name}
          onChange={(e) => setOrder({ ...order, name: e.target.value })}
          required
        />
      </div>
      {statusOrder === 1 ? (
        <button
          className="Venta"
          onClick={sendComanda}
          type="submit"
          target="_blank"
        >
          Cargar Venta
        </button>
      ) : statusOrder === 2 ? (
        <div>
          <button
            className="Venta "
            onClick={sendComanda}
            type="button"
            target="_blank"
          >
            Enviar Pedido
          </button>

          <div style={{ display: "flex", alignItems: "center" }}>
            ✔️
            <p className="orderFail">
              Por algún motivo no es posible realizar el pedido.
            </p>
            ✔️
          </div>
        </div>
      ) : statusOrder === 3 ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          ✔️
          <p className="orderExito">Tu pedido fue realizado con éxito</p>
          ✔️
        </div>
      ) : null}
    </form>
  );
};

export default FormularioVenta;
