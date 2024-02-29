import React, { useEffect } from 'react';
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
import { asyncAllProducts, asyncCategorias, asyncComercio } from './Components/redux/slice.jsx';
import { useDispatch } from 'react-redux';
// import { Bag } from './Components/Categorias/Bag.jsx';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => {
      console.log("Effect is running App");
      dispatch(asyncComercio());
      dispatch(asyncAllProducts());
      dispatch(asyncCategorias());
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
