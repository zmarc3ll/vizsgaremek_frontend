import { Component } from "react";
import { Link } from "react-router-dom";

interface State {
    users: User[];
    usernameInput: string;
    passwordInput: string;
    passwordAuthInput: string;
    emailInput: string;
    birthDateInput: string; //temporarily string but actually Date
    usernameWrong: string;
    passwordWrong: string;
    passwordAuthWrong:string;
    emailWrong: string;
    birthDateWrong: string;
}

interface User {
    id: number;
    username: string;
    password: string;
    passwordAuth: string;
    email: string;
    birthDate: Date;
}

interface UserListResponse {
    users: User[];
}

export default class Register extends Component<{}, State> {

    constructor(props: {}) {
        super(props);

        this.state = {
            usernameInput: '',
            passwordInput: '',
            passwordAuthInput: '',
            emailInput: '',
            birthDateInput: '', //format is not right for Date type.
            users: [],
            usernameWrong:'',
            passwordWrong:'',
            passwordAuthWrong:'',
            emailWrong:'',
            birthDateWrong:''
        }
    }

    
    async loadUsers() {
        let response = await fetch('http://localhost:3001/user');
        let data = await response.json() as UserListResponse;
        console.log(data);
        this.setState({
            users: data.users,
        })
    }

    componentDidMount() {
        this.loadUsers();
    }
    
    handleUpload = async () => {
        const { usernameInput, passwordInput, passwordAuthInput, emailInput, birthDateInput } = this.state;
        if (usernameInput.length < 3  || passwordInput.length <= 6 || passwordAuthInput.length <= 6 || passwordInput !== passwordAuthInput) {
            this.setState({
                usernameWrong: 'Adjon meg érvényes felhasználó nevet!',
                passwordWrong: 'Adjon meg érvényes jelszót!',
                passwordAuthWrong:'A jelszóknak egyeznie kell!',
                emailWrong: 'Adjon meg érvényes email címet!',
                birthDateWrong:'Adjon meg 18 év feletti születési dátumot!'
            })
            return;
        } else {
            this.setState({
            usernameWrong:'',
            passwordWrong:'',
            passwordAuthWrong:'',
            emailWrong:'',
            birthDateWrong:''
        })
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
            users: [],
            usernameWrong:'',
            passwordWrong:'',
            emailWrong:'',
            birthDateWrong:''
        })

        await this.loadUsers();
    };

    render() {
        const { usernameInput, passwordInput, passwordAuthInput, emailInput, birthDateInput, usernameWrong, passwordWrong, emailWrong, birthDateWrong,passwordAuthWrong } = this.state;
        const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const usernameReg = /^(?=.{7,12}$)[a-zA-Z]+\d+$/; //not working ):
        return <><section className="vh-200">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Regisztráció</p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" htmlFor="form3Example1c">Felhasználónév</label>
                                                    <input type="text" id="form3Example1c" className="form-control" value={usernameInput}onChange={e => this.setState({ usernameInput: e.currentTarget.value })} />
                                                    {(usernameInput.length < 3 && !usernameReg.test(usernameInput)) ? <label htmlFor="form3Example1c" className="form-label label-valid">{usernameWrong}</label> : <img className="checkmark" src={'check-mark.png'}/>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example3c">Email</label>
                                                    <input type="email" id="form3Example3c" className="form-control" value={emailInput} onChange={e => this.setState({ emailInput: e.currentTarget.value })} />
                                                    {!emailReg.test(emailInput) ? <label htmlFor="form3Example1c" className="form-label label-valid">{emailWrong}</label> : <img className="checkmark" src={'check-mark.png'}/>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4c">Jelszó</label>
                                                    <input type="password" id="form3Example4c" className="form-control" value={passwordInput} onChange={e => this.setState({ passwordInput: e.currentTarget.value })} />
                                                    {passwordInput.length < 6 ? <label htmlFor="form3Example1c" className="form-label label-valid">{passwordWrong}</label> : <img className="checkmark" src={'check-mark.png'}/>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4cd">Jelszó újra</label>
                                                    <input type="password" id="form3Example4cd" className="form-control" value={passwordAuthInput} required onChange={e => this.setState({ passwordAuthInput: e.currentTarget.value })} />
                                                    {passwordAuthInput !== passwordInput && passwordAuthInput.length < 3 ? <label htmlFor="form3Example1c" className="form-label label-valid">{passwordAuthWrong}</label> : <img className="checkmark" src={'check-mark.png'}/>} 
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4cd">Születési dátum</label>
                                                    <input type="date" id="form3Example4cd" className="form-control" value={birthDateInput} required onChange={e => this.setState({ birthDateInput: e.currentTarget.value })} />
                                                </div>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" required id="form2Example3c" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    Elfogadom a felhasználói feltételeket ( <a href="./tos.html">Terms of service</a> )
                                                </label>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                {/* <Link to={'/login'}> */}
                                                    <button type="submit" className="btn btn-success btn-lg" onClick={this.handleUpload}>Regisztrálás</button>
                                                    {/* </Link> */}
                                            </div>
                                            <p className="small fw-bold mt-2 pt-1 mb-0" id="hasAccount">Van már fiókja? <Link to={'/login'} className="link-danger">Bejelentkezés</Link></p>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src={'register-splashart.avif'} className="img-fluid" alt="register_plashart" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section></>
    }
}