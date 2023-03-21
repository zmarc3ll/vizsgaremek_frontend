import { Component } from "react";
import { Link } from "react-router-dom";

interface State {
    users: User[];
    usernameInput: string;
    passwordInput: string;
    passwordAuthInput: string;
    emailInput: string;
    birthDateInput: string;
    usernameWrong: string;
    passwordWrong: string;
    passwordAuthWrong: string;
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
            birthDateInput: '',
            users: [],
            usernameWrong: '',
            passwordWrong: '',
            passwordAuthWrong: '',
            emailWrong: '',
            birthDateWrong: '',
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

    handleValidation = async () => {
        const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const usernameReg = /^[a-zA-Z0-9]{3,10}$/;
        const { usernameInput, passwordInput, passwordAuthInput, emailInput, birthDateInput } = this.state;
        if (!usernameReg.test(usernameInput) || passwordInput.length < 6 || passwordAuthInput.length < 6 || passwordInput !== passwordAuthInput || !emailReg.test(emailInput) || (new Date(birthDateInput).getFullYear() > new Date().getFullYear() - 18)) {
            this.setState({
                usernameWrong: 'Adjon meg érvényes felhasználó nevet!',
                passwordWrong: 'Adjon meg érvényes jelszót!',
                passwordAuthWrong: 'A két jelszónak egyeznie kell!',
                emailWrong: 'Adjon meg érvényes email címet!',
                birthDateWrong: 'Csak a 18. életévüket betöltött felhasználók regisztrálhatnak!',
            })
            return;
        } else {
            this.setState({
                usernameWrong: '',
                passwordWrong: '',
                passwordAuthWrong: '',
                emailWrong: '',
                birthDateWrong: '',
            })
            return;
        }
    }

    handleUpload = async () => {
        const { usernameInput, passwordInput, passwordAuthInput, emailInput, birthDateInput } = this.state;
        const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const usernameReg = /^[a-zA-Z0-9]{3,10}$/;
        if (!usernameReg.test(usernameInput) || passwordInput.length < 6 || passwordAuthInput.length < 6 || passwordInput !== passwordAuthInput || !emailReg.test(emailInput) || (new Date(birthDateInput).getFullYear() > new Date().getFullYear() - 18)) {
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
            birthDateInput: '',
            users: [],
            usernameWrong: '',
            passwordWrong: '',
            emailWrong: '',
            birthDateWrong: '',
        })

        await this.loadUsers();
    };

    render() {
        const { usernameInput, passwordInput, passwordAuthInput, emailInput, birthDateInput, usernameWrong, passwordWrong, emailWrong, birthDateWrong, passwordAuthWrong } = this.state;
        const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const usernameReg = /^[a-zA-Z0-9]{3,10}$/;
        let isValid;
        return <>
            <body id="undoBlockContent">
                <section className="vh-200">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black">
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Regisztráció</p>
                                                <> {(() => {
                                                    if (usernameWrong === '' || emailWrong === '' || passwordWrong === '' || passwordAuthWrong === '' || birthDateWrong === '') {
                                                        isValid = true
                                                    } else {
                                                        isValid = false;
                                                    }
                                                })()}</>
                                                <form className="mx-1 mx-md-4" onSubmit={this.handleUpload}>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" htmlFor="form3Example1c">Felhasználónév</label>
                                                            <input type="text" id="form3Example1c" required className="form-control" value={usernameInput} onChange={
                                                                e => this.setState({ usernameInput: e.currentTarget.value })} />
                                                            {!usernameReg.test(usernameInput) ? (
                                                                <label htmlFor="form3Example1c" className="form-label label-valid">
                                                                    {usernameWrong}
                                                                </label>
                                                            ) : (
                                                                <img className="checkmark" src={'check-mark.png'} />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" htmlFor="form3Example3c">Email</label>
                                                            <input type="email" id="form3Example3c" className="form-control" value={emailInput} required onChange={e => this.setState({ emailInput: e.currentTarget.value })} />
                                                            {!emailReg.test(emailInput) ? <label htmlFor="form3Example1c" className="form-label label-valid">{emailWrong}</label> : <img className="checkmark" src={'check-mark.png'} />}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" htmlFor="form3Example4c">Jelszó</label>
                                                            <input type="password" id="form3Example4c" className="form-control" value={passwordInput} required onChange={e => this.setState({ passwordInput: e.currentTarget.value })} />
                                                            {passwordInput.length < 6 ? <label htmlFor="form3Example1c" className="form-label label-valid">{passwordWrong}</label> : <img className="checkmark" src={'check-mark.png'} />}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" htmlFor="form3Example4cd">Jelszó újra</label>
                                                            <input type="password" id="form3Example4cd" className="form-control" value={passwordAuthInput} required onChange={e => this.setState({ passwordAuthInput: e.currentTarget.value })} />
                                                            {passwordAuthInput !== passwordInput ? <label htmlFor="form3Example1c" className="form-label label-valid">{passwordAuthWrong}</label> : (passwordInput ? <img className="checkmark" src={'check-mark.png'} /> : null)}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" htmlFor="form3Example4cd">Születési dátum</label>
                                                            <input type="date" id="form3Example4cd" className="form-control" value={birthDateInput} required onInput={this.handleValidation} onChange={e => this.setState({ birthDateInput: e.currentTarget.value })} />
                                                            {new Date(birthDateInput).getFullYear() <= new Date().getFullYear() - 18 ? <img className="checkmark" src={'check-mark.png'} /> : <label htmlFor="form3Example4cd" className="form-label label-valid">{birthDateWrong}</label>}
                                                        </div>
                                                    </div>
                                                    <div className="form-check d-flex justify-content-center mb-5">
                                                        <input className="form-check-input me-2" type="checkbox" required value="" id="form2Example3c" />
                                                        <label className="form-check-label" htmlFor="form2Example3">
                                                            Elfogadom a felhasználói feltételeket ( <a href="/" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Terms of service</a> )
                                                        </label>
                                                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Felhasználói feltételek</h1>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <p>1. <strong>Általános információk</strong> <br />
                                                                            A TeAutód.hu weboldalának használata előfeltételezi az alábbi felhasználási feltételek elfogadását és betartását. A weboldal tulajdonosa a TeAutód Kft. (a továbbiakban: "Tulajdonos"). <br />
                                                                            A weboldal célja a járművek vásárlásával és értékesítésével kapcsolatos információk, termékek és szolgáltatások megjelenítése és közvetítése.<br />
                                                                            <br />
                                                                            2. <strong>Regisztráció</strong><br />
                                                                            A TeAutód.hu weboldalának használatához regisztráció szükséges. A regisztráció során megadott adatoknak valósak és pontosak kell lenniük. A regisztrációval a felhasználó elfogadja az adatvédelmi szabályzatot is.<br />
                                                                            <br />
                                                                            A regisztrált felhasználók felelősek a felhasználónevük és jelszavuk biztonságáért, és kötelesek azokat bizalmasan kezelni.<br />
                                                                            <br />
                                                                            3. <strong>Tartalom és szerzői jogok</strong><br />
                                                                            A TeAutód.hu weboldalon található minden tartalom, például szöveg, kép, hang, videó, grafika, stb. az oldal tulajdonát képezi, vagy a jogtulajdonos engedélyével került felhasználásra. A tartalom bármely formában történő felhasználása és terjesztése kizárólag a Tulajdonos előzetes írásbeli engedélyével lehetséges.<br />
                                                                            <br />
                                                                            4. <strong>Felhasználói magatartás</strong><br />
                                                                            A TeAutód.hu weboldalon történő használat során a felhasználónak tilos bármilyen jogellenes, trágár, fenyegető, zaklató, rágalmazó vagy obszcén anyagot közzétenni vagy terjeszteni, harmadik személyek jogait megsérteni, vagy a weboldal működését akadályozni vagy zavarni.<br />
                                                                            <br />
                                                                            5. <strong>Adatvédelem</strong><br />
                                                                            A TeAutód.hu weboldal adatvédelmi szabályzata az oldalon található, és az adatkezeléssel kapcsolatos részleteket tartalmazza.<br />
                                                                            <br />
                                                                            6. <strong>Felelősség</strong><br />
                                                                            A TeAutód.hu weboldal fenntartja a jogot a változtatásokra, a weboldal tartalmának módosítására, vagy akár az oldal teljes leállására!</p><br />
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Bezár</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        {/* <Link to={'/login'}> */}
                                                        {isValid ? <button type="submit" className="btn btn-success btn-lg" onClick={this.handleValidation}>Regisztrálás</button> : <button type="submit" disabled className="btn btn-success btn-lg" onClick={this.handleValidation}>Regisztrálás</button>}
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
                </section>
            </body></>
    }
}