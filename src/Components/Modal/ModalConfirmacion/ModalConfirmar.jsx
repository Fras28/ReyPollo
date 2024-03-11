import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Logo from "../../assets/Logo.png";
import "./ModalConfirmar.css"
import { useDispatch, useSelector } from "react-redux";
import { asyncOrder } from "../../redux/slice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirm({total }) {
  const dispatch = useDispatch();
  const { comercio, favProd } = useSelector((state) => state.alldata);
  const [open, setOpen] = React.useState(false);
  
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

  const [telefono, setTelefono] = React.useState("");
  const [payment, setPayment] = React.useState({
    payment: "",
  });


  // total_pedido,metodo_de_pago,pedido,name,detalle,tipo_orden,telefono,domicilio,CreatedBy
  const [order, setOrder] = React.useState({
    total_pedido: total,
    metodo_de_pago: "",
    pedido: orderString,
    name: "",
    Detail: "",
    tipo_orden: "",
    telefono: "291",
    domicilio: "",
  });

  const handleTelefonoChange = (e) => {
    setOrder({
      ...order,
      telefono: e.target.value,  // Update to use 'telefono' instead of 'Phone'
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const metodoPago = function handbleOnMethod(e) {
    setPayment({
      payment: e.target.value,
    });
  };

  const handleOrder = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };





  
  const sendComanda = (e) => {
    e.preventDefault();  // Añade esto para prevenir el comportamiento predeterminado
    console.log("Comanda saliendo del componente");
    dispatch(asyncOrder(order));
  };




  const whatsappMessage = Object.entries(groupedProducts)
    .map(([productInfo, count]) => {
      const [name, price] = productInfo.split(" - ");
      return `${name} ($${price}) x${count},`;
    })
    .join(", ");

  const whatsappLink = `http://wa.me/${comercio[0]?.attributes?.whatsapp}?text=Hola ${comercio[0]?.attributes?.name} Mensaje de mi pedido ➤ ${whatsappMessage} Total = $ ${total}, "${order?.metodo_de_pago}"`;



  console.log(order, "pedido de modal");
  return (
    <div >
      <div>
        <button onClick={handleClickOpen} className="btnWssp low">Enviar Pedido </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{zIndex:9999, boxShadow:"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"}}
     > 
     {/* box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset; */}
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
          <DialogContentText id="alert-dialog-slide-description">
            Genial, estas a un paso de finalizar tu pedido.
            <br />
            ayudanos a tener una mejor atencion :
            <form className="formPedido">

            <div className="boxPedido">
        <div className="boxPedido1"></div>
        <div className="wsspTarj">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            className={`telefono-input selectP ${
              /^\d{10}$/.test(order.telefono) ? "" : "redX"
            }`}
            type="tel"
            id="telefono"
            name="telefono"
            maxLength="10"
            value={order.telefono}
            onChange={handleOrder}
            placeholder="Ingresar telefono"
          />
          {order.telefono && /^\d{10}$/.test(order.telefono) ? (
            <p className="valid-message">✔️</p>
          ) : null}
          {order.telefono && /^\d{10}$/.test(order.telefono)
            ? null
            : order.telefono &&
              order.telefono !== "291" && (
                <p className="error-message">
                  Por favor, ingrese un número de teléfono válido.
                </p>
              )}
          <label htmlFor="name">name :</label>
          <input
            className={`telefono-input selectP ${
              order.name.length > 3 ? "" : "redX"
            }`}
            type="text"
            id="name"
            name="name"
            max="10"
            value={order.name}
            onChange={handleOrder}
            placeholder="name de quien retira"
          />
          <select
            className="selectP"
            name="metodo_de_pago"
            onChange={handleOrder}
            value={order.metodo_de_pago}
          >
            <option hidden disabled selected value={""}>
              Como pagas?
            </option>
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>QR</option>
          </select>
          <select
            className="selectP"
            name="tipo_orden"
            onChange={handleOrder}
            value={order.tipo_orden}
          >
            <option hidden disabled selected value={""}>
              Delivery o Take Away?
            </option>
            <option>Delivery</option>
            <option>Take Away</option>
          </select>
          <div
            style={{
              display: order.tipo_orden === "Delivery" ? "flex" : "none",
              flexDirection:"column"
            }}
          >
            <label htmlFor="domicilio" >Domicilio:</label>
            <input
              className={`telefono-input selectP ${
                order.tipo_orden === "Delivery" && order.domicilio.length > 7
                  ? ""
                  : "redX"
              }`}
              type="text"
              id="domicilio"
              name="domicilio"
              max="20"
              value={order.domicilio}
              onChange={handleOrder}
              placeholder="Domicilio para la entrega"
            />
          </div>
          <a
            href={whatsappLink}
            onClick={(e) => sendComanda(e)}
            rel="noreferrer"
            target="_blank"
            disabled={
              !(
                /^\d{10}$/.test(order.telefono) &&
                order.name.length > 3 &&
                (order.tipo_orden === "Take Away" ||
                  (order.tipo_orden === "Delivery" &&
                    order.domicilio.length > 7)) &&
                order.metodo_de_pago &&
                order.total_pedido
              )
            }
          >
            <button
              className="btnWssp"
              disabled={
                !(
                  /^\d{10}$/.test(order.telefono) &&
                  order.name.length > 3 &&
                  (order.tipo_orden === "Take Away" ||
                    (order.tipo_orden === "Delivery" &&
                      order.domicilio.length > 7)) &&
                  order.metodo_de_pago &&
                  order.total_pedido
                )
              }
            >
              Enviar Pedido{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 665 660"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M501.92 250.307C501.92 112.187 389.556 0.23999 251.44 0.23999C113.32 0.245198 0.946289 112.824 0.946289 250.947C0.946289 301.535 15.7583 349.873 43.905 391.347L3.20229 471.456C-0.0685091 477.878 0.238689 484.727 4.00958 490.868C7.78038 497.019 14.468 499.946 21.6869 499.946H251.447C389.567 499.946 501.927 388.425 501.927 250.306L501.92 250.307ZM84.6263 377.119C57.0063 340.608 42.4076 297.051 42.4076 251.16C42.4076 135.905 136.173 42.1333 251.434 42.1333C366.689 42.1333 460.461 132.931 460.461 248.187C460.461 363.443 366.701 454.24 251.434 454.24H55.4743L86.5676 396.052C90.1718 388.979 89.4166 383.443 84.6354 377.12L84.6263 377.119ZM662.133 633.972C665.404 640.404 665.097 645.977 661.326 652.123C657.555 658.268 650.867 659.946 643.648 659.946H413.902C331.396 659.946 254.195 621.378 207.368 553.284C200.879 543.857 203.269 531.987 212.702 525.498C222.139 519.008 235.051 521.529 241.53 530.961C280.612 587.795 345.046 621.852 413.903 621.852H609.85L578.756 561.081C575.163 554.008 575.913 545.707 580.699 539.373C608.308 502.863 622.918 459.404 622.918 413.509C622.918 344.061 588.532 279.363 530.939 240.363C521.455 233.946 518.975 221.081 525.403 211.592C531.819 202.113 544.709 199.639 554.195 206.061C623.195 252.79 664.383 330.373 664.383 413.594C664.383 464.193 649.571 512.422 621.424 553.901L662.133 633.972ZM230.706 145.665C230.706 134.212 239.988 126.619 251.436 126.619H354.894C366.337 126.619 375.624 134.212 375.624 145.665C375.629 157.118 366.337 164.712 354.894 164.712H251.436C239.983 164.712 230.706 157.118 230.706 145.665ZM127.253 244.712C127.253 233.259 136.534 225.665 147.982 225.665H354.889C366.332 225.665 375.618 233.259 375.618 244.712C375.624 256.165 366.332 263.759 354.889 263.759H147.982C136.534 263.759 127.253 256.165 127.253 244.712ZM127.253 343.759C127.253 332.306 136.534 324.712 147.982 324.712H354.889C366.332 324.712 375.618 332.306 375.618 343.759C375.618 355.201 366.332 362.805 354.889 362.805H147.982C136.534 362.805 127.253 355.201 127.253 343.759Z"
                  fill="#1F7537"
                />
              </svg>
            </button>
          </a>{" "}
{
  !(
    /^\d{10}$/.test(order.telefono) &&
    order.name.length > 3 &&
    (order.tipo_orden === "Take Away" ||
      (order.tipo_orden === "Delivery" && order.domicilio.length > 7)) &&
    order.metodo_de_pago &&
    order.total_pedido
  ) && (
    <ul style={{ color: "red", marginTop: "10px" }}>
      {!(order.name.length > 3) && (
        <li>Ingrese un name válido (más de 3 caracteres).</li>
      )}
      {!(order.tipo_orden === "Take Away" || (order.tipo_orden === "Delivery" && order.domicilio.length > 7)) && (
        <li>Seleccione una opción válida para el tipo de pedido y, si es Delivery, ingrese una dirección válida.</li>
      )}
      {!order.metodo_de_pago && <li>Seleccione una forma de pago.</li>}
      {!order.total_pedido && <li>El total del pedido no puede estar vacío.</li>}
    </ul>
  )
}


        </div>
        {/* <ModalConfirm /> */}
      </div>
            </form>
          </DialogContentText>
          {order?.telefono?.length === 10 ? "" : <p style={{ color: "red" }}>El número de teléfono debe contener 10 caracteres. Ejemplo: 2915838406...</p>}
        </DialogContent>
        <DialogActions> </DialogActions>
      </Dialog>
    </div>
  );
}
