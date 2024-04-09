import React, { useState } from 'react';
import Button from "@mui/material/Button";
import "../../Comander/formVenta/formVenta.css"; 
import { useDispatch, useSelector } from 'react-redux';
import { asyncProveedor } from '../../redux/slice';

const NuevoProveedor = ({ total }) => {
  const dispatch = useDispatch();
  const { comercio, favProd } = useSelector((state) => state.alldata);
  const [open, setOpen] = useState(false);
  const [statusOrder, setStatusOrder] = useState(1);
  const [proveedor, setProveedor] = useState({
    name: "",
    telefono:"",
    email:"",
    direccion:""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProveedor({
      ...proveedor,
      [name]: value
    });
  };

  const sendProveedor = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(asyncProveedor(proveedor, setStatusOrder));
      console.log("Proveedor agregado correctamente:", response);
    } catch (error) {
      console.error("Error al agregar proveedor:", error);
      setStatusOrder(2);
    }
  };

  return (
    <div className="modal-container">
      <h2 className="modal-title">NUEVO PROVEEDOR</h2>
      <form onSubmit={sendProveedor} className="modal-form">
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            className={`input-field ${/^(\d{10})?$/.test(proveedor.telefono) ? "" : "error"}`}
            type="tel"
            id="telefono"
            name="telefono"
            maxLength="10"
            value={proveedor.telefono}
            onChange={handleInputChange}
            placeholder="Ingresar teléfono"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre Proveedor:</label>
          <input
            className={`input-field ${proveedor.name.length > 3 ? "" : "error"}`}
            type="text"
            id="name"
            name="name"
            value={proveedor.name}
            onChange={handleInputChange}
            placeholder="Nombre del proveedor"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className={`input-field ${proveedor.email.length > 3 ? "" : "error"}`}
            type="email"
            id="email"
            name="email"
            value={proveedor.email}
            onChange={handleInputChange}
            placeholder="Email del proveedor"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            className={`input-field ${proveedor.direccion.length > 3 ? "" : "error"}`}
            type="text"
            id="direccion"
            name="direccion"
            value={proveedor.direccion}
            onChange={handleInputChange}
            placeholder="Dirección del proveedor"
            required
          />
        </div>
        <button className="submit-button" type="submit">Agregar Proveedor</button>
        {statusOrder === 2 && (
          <p className="error-message">Error al agregar proveedor. Por favor, intenta de nuevo.</p>
        )}
      </form>
    </div>
  );
};

export default NuevoProveedor;
