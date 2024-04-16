import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing/LandingPage.jsx";
import "./App.css";

import { Foot } from "./Components/Footer/Footer.jsx";
import { MyFoot } from "./Components/myFoot/MyFooter.jsx";
import { Inicio } from "./Components/LandingStart/LandingStart.jsx";
import LandingPage from "./Components/Landing/LandingPage.jsx";

import { BagXX } from "./Components/myBag/myBag.jsx";
import {
  asyncAllProducts,
  asyncCategorias,
  asyncComercio,
  asyncSubCategorias,
  asyncUser,
} from "./Components/redux/slice.jsx";
import { useDispatch, useSelector } from "react-redux";
import store, { saveStateToLocalStorage } from "./Components/redux/store.jsx";
import { ToastContainer } from "react-toastify";

import { CompSubCat } from "./Components/Categorias/CompSubCat.jsx";
import { AdminPanel } from "./Components/Comander/AdminPanel.jsx";
// import { Bag } from './Components/Categorias/Bag.jsx';

function App() {
  const dispatch = useDispatch();
  const { allProduct, favProd, categorias, comercio } = useSelector(
    (state) => state.alldata
  );
  
  // Determina si alguno de los estados relevantes ha cambiado
  const [isEffectExecuted, setIsEffectExecuted] = useState(false);
  
  useEffect(() => {
    // Verificar si el efecto ya se ha ejecutado
    if (!isEffectExecuted) {
      // Ejecutar la lógica solo una vez al inicio de la aplicación
      console.log("Effect is running");
      dispatch(asyncComercio());
      dispatch(asyncUser());
      // Aquí colocas tu lógica de carga de datos
      setIsEffectExecuted(true); // Marcar el efecto como ejecutado
    }
  }, [isEffectExecuted]); // Dependencia: isEffectExecuted

  

  const toTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <Switch>
      <Route exact path="/Comander" component={AdminPanel}/>
        <Route exact path="/:id?" component={Inicio} />
        <Route exact path="/:id/Landing" component={LandingPage} />
        {categorias.map((cat) => (
          <Route
            exact
            path={`/:id/Landing/:category`}
            key={cat.id}
            render={(props) => <CompSubCat idCat={cat.id} {...props} />}
          />
        ))}  
        <Route
          exact
          path="/:id/Landing/Comander"
          component={AdminPanel}
        />
        <Route exact path="/:id/bag" component={BagXX} />
      </Switch>
      <Foot />
      <MyFoot />
    </div>
  );
}

export default App;
