import {Link} from "react-router-dom"
import { useState } from "react";



function Register(props) {

const [formValue, setFormValue] = useState({
    password: '',
    email: ''
})

const handleChange = (e) => {  
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value})
}

const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(formValue)
}

    return (
        <div className="signpage">
            <h2 className="signpage__header">Регистрация</h2>
            <form action="submit" className="form" noValidate onSubmit={handleSubmit} >
            <label className="form__label">
        <input type="text" className="form__input form__input_el_email form__input-dark" name="email" placeholder="Email"
            required="required" minLength="2" maxLength="40" id="email-input" value={formValue.email || ''} onChange={handleChange} />
        <span className="form__input-error email-input-error"></span>
      </label>
      <label className="form__label">
        <input   type="password" className="form__input form__input_el_password form__input-dark" name="password"
            placeholder="Пароль" required="required" minLength="2" maxLength="200"
            id="password-input" value={formValue.password || ''} onChange={handleChange} />
        <span className="form__input-error password-input-error"></span>
      </label>
                <button type="submit" className="form__submit-button form__submit-button-dark"  >Зарегистрироваться</button>
                <p className="signpage__question">Уже зарегистрированы? <Link to={'/sign-in'} className="signpage__link">Войти</Link> </p>
            </form>  
        </div>
    );
  }
  
  export default Register;