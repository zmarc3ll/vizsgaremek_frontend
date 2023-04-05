import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Calendar from './components/pages/Calendar';
import NavbarComponent from './components/Navbar-component';
import FooterComponent from './components/Footer-component';
import GarageForCar from './components/pages/GarageForCar';
import AboutUs from './components/pages/AboutUs';
import Garage from './components/pages/Garage';

class App extends Component {
  
  render() {
    return <div>
      <NavbarComponent></NavbarComponent>
      <main>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/garage' element={<Garage />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/carPage' element={<GarageForCar />} />
        </Routes>
      </main>
      <FooterComponent></FooterComponent>
      {/*  <h2>Új user felvétele</h2>
    Username: <input type="text" value={usernameInput} onChange={e => this.setState({ usernameInput: e.currentTarget.value})} /> <br />
    Jelszó: <input type="text" value={passwordInput} onChange={e => this.setState({ passwordInput: e.currentTarget.value })}/> <br />
    Jelszó újra: <input type="text" value={passwordAuthInput} onChange={e => this.setState({passwordAuthInput: e.currentTarget.value })}/> <br />
    Email: <input type="text" value={emailInput} onChange={e => this.setState({emailInput: e.currentTarget.value })}/> <br /> 
    Születési Év: <input type="date" value={birthDateInput} onChange={e => this.setState({ birthDateInput: e.currentTarget.value })}/> <br /> 
    <button onClick={this.handleUpload}>Hozzáaddás</button> <br />
      <h2>Adatbázis tábla tartalmazza:</h2>
      <ul>{
        this.state.users.map(user =>
        <li>{user.username}, {user.email} </li>
        )
        }</ul> */}
    </div>
  }
}

export default App;
