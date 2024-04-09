import React, { useState } from 'react';
import "./formVenta.css";

import ModalGen from '../../Modal/ModalConfirmacion/Modal';

import NuevoProveedor from '../../Modal/ModalConfirmacion/ModalProveedor';




const FormularioGastos = () => {
  const [totalVenta, setTotalVenta] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [nombreCajero, setNombreCajero] = useState('');
  const [nombreProveedor, setNombreProveedor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar cualquier lógica adicional con los datos del formulario
    console.log('Total de la venta:', totalVenta);
    console.log('Método de pago:', metodoPago);
    console.log('Nombre del cajero/a:', nombreCajero);
    // Puedes enviar los datos a una API, guardarlos en el estado global, etc.
  };

  return (
    <form onSubmit={handleSubmit} className='Formix' >
      <h2 className='titFormix'>Gastos y Egresos</h2>
      <div>
        <label htmlFor="nombreProveedor" className='nombreProveedor'>Nombre del Proveedor:</label>
        <input
          type="text"
          id="nombreProveedor"
          value={nombreProveedor}
          onChange={(e) => setNombreProveedor(e.target.value)}
          required
        /> <ModalGen  Child={<NuevoProveedor/>}  txtBtn="Nuevo Proveedor"/>
      </div>
      <div >
        <label htmlFor="totalVenta"  className='nombreProveedor'>Total $:</label>
        <input
          type="number"
          id="totalVenta"
          value={totalVenta}
          onChange={(e) => setTotalVenta(e.target.value)}
          required
        />
      </div>
      <div>
  <label htmlFor="metodoPago"  className='nombreProveedor'>Tipo de Egresso:</label>
  <select
    id="metodoPago"
    value={metodoPago}
    onChange={(e) => setMetodoPago(e.target.value)}
    required
  >
    <option value="">Seleccionar Tipo de Gasto</option>
    <option value="Proveedores">Proveedores</option>
    <option value="Servicios">Servicios</option>
    <option value="Impuestos">Impuestos</option>
 
  </select>
</div>

      <div>
        <label htmlFor="nombreCajero" className='nombreProveedor'>Nombre del cajero/a:</label>
        <input
          type="text"
          id="nombreCajero"
          value={nombreCajero}
          onChange={(e) => setNombreCajero(e.target.value)}
          required
        />
      </div>
      <button type="submit">Enviar</button>

    </form>
  );
};

export default FormularioGastos;
