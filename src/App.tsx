import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Calendar from './components/pages/Calendar';
import NavbarComponent from './components/Navbar-component';
import FooterComponent from './components/Footer-component';
import GarageForCar from './components/pages/GarageForCar';
import AboutUs from './components/pages/AboutUs';
import Garage from './components/pages/Garage';
import Helmet from 'react-helmet';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function GarageForCarWrapper() {
  const { carId } = useParams();
  return <GarageForCar carId={carId} />;
}

const ConditionalFooter: React.FC = () => {
  const location = useLocation();

  // Ha a path '/garage/'-rel kezdődik, ne jelenjen meg
 if (location.pathname.startsWith('/garage/') || location.pathname === '/calendar' || location.pathname.startsWith('/garage')) {
    return null;
  }

  return <FooterComponent />;
};


class App extends Component {

  render() {
    return <div>
      <Helmet>
        <title>TeAutod</title>
      </Helmet>

      <NavbarComponent></NavbarComponent>
      <main>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/garage' element={<Garage />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/garage/:carId' element={<GarageForCarWrapper />} />
        </Routes>
      </main>
      <ConditionalFooter />
    </div>
  }
}

export default App;
