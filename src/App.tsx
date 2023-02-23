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

  render() {
    const {usernameInput, passwordInput, passwordAuthInput, emailInput,birthDateInput} = this.state;
    return <div>
       <h2>Új user felvétele</h2>
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
        }</ul>
    </div>
  }
}

export default App;
