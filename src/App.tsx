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

class App extends Component<{}, State> {
  constructor(props: {}){
    super(props);

    this.state = {
      usernameInput: '',
      passwordInput: '',
      passwordAuthInput: '',
      emailInput: '',
      birthDateInput: '', //format is not right for Date type.
      users: []
    }
  }

  async loadUsers(){
    let response = await fetch('http://localhost:3001/user');
    let data = await response.json() as User[];
    console.log(data);
    this.setState({
      users: data,
    })
  }

  componentDidMount() {
    this.loadUsers();
  }
 
  handleUpload = async () => {
    const { usernameInput, passwordInput, passwordAuthInput, emailInput, birthDateInput } = this.state;
    if(usernameInput.trim() === '' || passwordInput.length < 6 || passwordAuthInput.length < 6 || emailInput.trim() === '' || birthDateInput.trim() === ''){
      return;      
    }

    const dbData = {
      username: usernameInput,
      password: passwordInput,
      passwordAuth: passwordAuthInput,
      email: emailInput,
      birthDate: birthDateInput,
    }

    let response = await fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dbData),
    });

    this.setState({
      usernameInput: '',
      passwordInput: '',
      passwordAuthInput: '',
      emailInput: '',
      birthDateInput: '', //format is not right for Date type.
      users: []
    })

    await this.loadUsers();
  };

  
}

export default App;
