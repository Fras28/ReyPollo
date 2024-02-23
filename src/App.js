import React from 'react';
import {  Route,Switch} from 'react-router-dom';
import Landing from "./Components/Landing/LandingPage.jsx"
import './App.css';
import {Polleria} from './Components/Polleria/Polleria.jsx'
import { Foot } from './Components/Footer/Footer.jsx';
import { Comidas } from './Components/Comidas/Comidas';
import { Bag } from './Components/myBag/myBag.jsx';
import { MyFoot } from './Components/myFoot/MyFooter.jsx';
import { Bebidas } from './Components/Bebidas/Bebidas.jsx';
import { SpecialEvent } from './Components/SpecialEvent/SpecialEvent.jsx';
import { TrackClub } from './Components/TrackClub/TrackClub.jsx';
import { Inicio } from './Components/LandingStart/LandingStart.jsx';

function App() {
  return (
    <div className="App">
<Switch>
          <Route exact path="/:id?" component={Inicio}/>
          <Route exact path="/:id/Landing" component={Landing}/>
          <Route exact path="/:id/Landing/Polleria" component={Polleria}/>
          <Route exact path="/:id/bag" component={Bag}/>
</Switch>
  <Foot/>
  <MyFoot/>
    </div>
  );
}

export default App;
