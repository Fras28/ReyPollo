import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { asyncOrder, asyncProveedor } from "../../redux/slice";
import Logo from "../../assets/Logo.png";
import "./ModalConfirmar.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalProveedor({ total }) {
  const dispatch = useDispatch();
  const { comercio, favProd } = useSelector((state) => state.alldata);
  const [open, setOpen] = React.useState(false);

  const [statusOrder, setStatusOrder] = React.useState(1);



  const [proveedor, setProveedor] = React.useState({
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

  const handleOrder = (e) => {
    setProveedor({
      ...proveedor,
      [e.target.name]: e.target.value,
    });
  };


  const sendComanda = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del enlace
  
    try {
      // Aquí colocas la lógica para enviar la comanda
      const response = await dispatch(asyncProveedor(proveedor, setStatusOrder));
      // Redirigir al usuario a WhatsApp si la comanda se envió correctamente
      console.log("Comanda enviada correctamente:", response);
    } catch (error) {
      console.error("Error al enviar la comanda:", error);
      // Actualizar el estado para indicar que hubo un error al enviar la orden
      setStatusOrder(2);
    }
  };


  return (
    <div>
      <div>
        <button onClick={handleClickOpen} className="btnWssp low">
          Agregar Proveedor
        </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{
          zIndex: 9999,
        
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        }}
      >
        <DialogTitle className="infoNavi">
          <div>
            <img src={Logo} alt="logo Coqui Cakes" width="100px" />
          </div>
          <div style={{ marginLeft: "30%" }}>
            <button className="exit" onClick={handleClose}>
              x
            </button>
          </div>
        </DialogTitle>
        <DialogContent>
          <div id="alert-dialog-slide-description" className="boxModal">
         <h2 style={{color:"black"}}> NUEVO PROVEDOR </h2> 
           
            <form className="formPedido">
              <div className="boxProvee">
        <div>
               <label htmlFor="telefono" >Teléfono:</label>
                <input
                  className={`telefono-input selectP ${
                    /^\d{10}$/.test(proveedor?.telefono) ? "" : "redX"
                  }`}
                  type="tel"
                  id="telefono"
                  name="telefono"
                  maxLength="10"
                  value={proveedor?.telefono}
                  onChange={handleOrder}
                  placeholder="Ingresar telefono"
                />
                {proveedor?.telefono && /^\d{10}$/.test(proveedor?.telefono) ? (
                  <p className="valid-message">✔️</p>
                ) : null}
                {proveedor?.telefono && /^\d{10}$/.test(proveedor?.telefono)
                  ? null
                  : proveedor.telefono &&
                    proveedor.telefono !== "291" && (
                      <p className="error-message">
                        Por favor, ingrese un número de teléfono válido.
                      </p>
                    )}
        </div>
        <div>
                <label htmlFor="name">Nombre Proveedor:</label>
                <input
                  className={`telefono-input selectP ${
                    proveedor.name.length > 3 ? "" : "redX"
                  }`}
                  type="text"
                  id="name"
                  name="name"
                  max="10"
                  value={proveedor?.name}
                  onChange={handleOrder}
                  placeholder="name del proveedor"
                />
        </div>
        <div>
   <label htmlFor="name">Email :</label>
                <input
                  className={`telefono-input selectP ${
                    proveedor?.email?.length > 3 ? "" : "redX"
                  }`}
                  type="email"
                  id="name"
                  name="email"
                  value={proveedor?.email}
                  onChange={handleOrder}
                  placeholder="Email de proveedor"
                />
        </div>
        <div>
                  <label htmlFor="name">Direccion :</label>
                <input
                  className={`telefono-input selectP ${
                    proveedor?.email?.length > 3 ? "" : "redX"
                  }`}
                  type="email"
                  id="name"
                  name="direccion"
                  value={proveedor?.direccion}
                  onChange={handleOrder}
                  placeholder="Direccion de proveedor"
                />
        </div>


           
             
       
       
             
                {statusOrder === 1 ? (
                  <button
                    className="btnWssp"
                    onClick={sendComanda}
                    type="button"
                    target="_blank"
                  >
                    Agregar
                  </button>
                ) : statusOrder === 2 ? (
                  <div>
                    <button
                      className="btnWssp"
                      onClick={sendComanda}
                      type="button"
                      target="_blank"
                    >
                      Enviar Pedido
                    </button>
                  
                    <div style={{display:"flex", alignItems:"center"}}>
                    ✔️
                   <p className="orderFail">
                      Por algún motivo no es posible realizar el pedido.
                    </p>
                    ✔️
                  </div>
                  </div>
                ) : statusOrder === 3 ? (
                  <div style={{display:"flex", alignItems:"center"}}>
                    ✔️
                    <p className="orderExito">
                     Tu pedido fue realizado con éxito 
                    </p>
                    ✔️
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions> </DialogActions>
      </Dialog>
    </div>
  );
}
