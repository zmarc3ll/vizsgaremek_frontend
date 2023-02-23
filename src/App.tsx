import React, { Component } from 'react';
import './App.css';

interface User{
  id: number;
  username: string;
  password: string;
  passwordAuth: string;
  email: string;
  birthDate: Date;
}

interface UserListResponse{
  users: User[];
}

interface State{
  users: User[];
  usernameInput: string;
  passwordInput: string;
  passwordAuthInput: string;
  emailInput: string;
  birthDateInput: string; //temporarily string but actually Date
}


export default App;
