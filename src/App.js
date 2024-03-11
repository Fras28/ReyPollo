import React, { useEffect, useRef } from 'react';
import {  Route,Switch} from 'react-router-dom';
import Landing from "./Components/Landing/LandingPage.jsx"
import './App.css';
import {Polleria} from './Components/Categorias/Polleria.jsx'
import { Foot } from './Components/Footer/Footer.jsx';

import { MyFoot } from './Components/myFoot/MyFooter.jsx';
import { Inicio } from './Components/LandingStart/LandingStart.jsx';
import LandingPage from './Components/Landing/LandingPage.jsx';
import { Almacen } from './Components/Categorias/Almacen.jsx';
import { Congelados } from './Components/Categorias/Congelados.jsx';
import { Ofertas } from './Components/Categorias/Ofertas.jsx';
import { BagXX } from './Components/myBag/myBag.jsx';
import { asyncAllProducts, asyncCategorias, asyncComercio, asyncUser } from './Components/redux/slice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import store, { saveStateToLocalStorage } from './Components/redux/store.jsx';
import { ToastContainer } from 'react-toastify';
// import { Bag } from './Components/Categorias/Bag.jsx';


function App() {
  const dispatch = useDispatch();
  const { allProduct, favProd, categorias, comercio } = useSelector((state) => state.alldata);

  // useRef para mantener una referencia a los estados anteriores
  const prevStatesRef = useRef({ allProduct: [], favProd: [], categorias: [], comercio: [] });
  useEffect(() => {
    const fetchData = () => {
      console.log("Effect is running");
      dispatch(asyncComercio());
      dispatch(asyncAllProducts());
      dispatch(asyncCategorias());
      dispatch(asyncUser());
    };
    
    fetchData();
    
    const intervalId = setInterval(fetchData, 15 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [dispatch]);
  

  const toTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="App">
<Switch>
      
          <Route exact path="/:id?" component={Inicio}/>
          <Route exact path="/:id/Landing" component={LandingPage}/>
          <Route exact path="/:id/Landing/Polleria" component={Polleria}/>
          <Route exact path="/:id/Landing/Almacen" component={Almacen}/>
          <Route exact path="/:id/Landing/Congelados" component={Congelados}/>
          <Route exact path="/:id/Landing/Ofertas" component={Ofertas}/>
          <Route exact path="/:id/bag" component={BagXX}/>
</Switch>
  <Foot/>
  <MyFoot/>
    </div>
  );
}

export default App;
