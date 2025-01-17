import axios from "axios";
import { Component, FormEvent } from "react";
import { Link } from "react-router-dom";

interface ILoginState {
  username: string;
  password: string;
  errors: {
    username: string;
    password: string;
  };
}

export default class Login extends Component<{}, ILoginState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: {
        username: "",
        password: "",
      },
    };
  }
  handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    const errors = { ...this.state.errors };
    if (username.length === 0) {
      errors.username = "Adja meg a felhsználó nevet!";
    } else {
      errors.username = "";
    }
    this.setState({ username, errors });
    const usernameStored = username;
    localStorage.setItem('username', usernameStored);
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const errors = { ...this.state.errors };
    if (password.length === 0) {
      errors.password = "Adja meg a jelszavát!";
    } else {
      errors.password = "";
    }
    this.setState({ password, errors });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    });
    if (response.ok) {
      const { token,userId } = await response.json();
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userId", userId);
      window.location.href = "/";
      console.log('Üdvözöljük!');
      const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const loginData = {
          username: formData.get('username') as string,
          password: formData.get('password') as string,
        };
        axios.post('http://localhost:3001/auth/login', loginData)
          .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
          })
          .catch(error => {
            console.log('Error during login: ',error);
          });
      };
    } else if (response.status === 401) {
      this.setState({
        errors: {
          username: "",
          password: "A megadott felhasználónév vagy jelszó helytelen.",
        },
      });
    } else {
      console.error("Failed to log in");
    }
  };


  render() {
    return <><main id="undoBlockContent">
      <section>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100" id="fillPage">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={'auto-removebg-preview.png'} className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={this.handleSubmit}>
                <div className="divider d-flex align-items-center my-4">
                  <h2 className="text-center fw-bold mx-1 mb-3 pt-2">Belépés</h2>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">Felhasználónév</label>
                  <input type="text" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Adja meg a felhsználónevét" value={this.state.username}
                    onChange={this.handleUsernameChange} />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">Jelszó</label>
                  <input type="password" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Adja meg a jelszót" value={this.state.password}
                    onChange={this.handlePasswordChange} />
                  {this.state.errors.password && (
                    <div className="invalid-feedback">{this.state.errors.password}</div>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-body"><em>Üdvözöljük!</em></p>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button className="btn btn-success btn-lg" type="submit" role="button" aria-pressed="false">Bejelentkezés</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Nincs fiókja? <Link to={'/register'} className="link-danger">Regisztrálok</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main></>

  }

}

function setIsLoggedIn(arg0: boolean) {
  throw new Error("Function not implemented.");
}
