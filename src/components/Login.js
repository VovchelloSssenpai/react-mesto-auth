import {useNavigate} from "react-router-dom"
import { useState } from "react";


function Login(props) {
  const navigate = useNavigate();

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
  props.onAuthorize(formValue).then((res) => {
    if(res.token) { setFormValue({
    password: '',
    email: ''
}); 
  props.handleLogin(); navigate("/", {replace: true}) }}); 
  const { email } = formValue;
  props.setProfileData(email);
}

  return (
      <div className="signpage">
          <h2 className="signpage__header">Вход</h2>
          <form action="submit" className="form" noValidate onSubmit={handleSubmit} >
          <label className="form__label">
      <input onChange={handleChange} value={formValue.email || ''} type="text" className="form__input form__input_el_email form__input-dark" name="email" placeholder="Email"
          required="required" minLength="2" maxLength="40" id="email-input" />
      <span className="form__input-error email-input-error"></span>
    </label>
    <label className="form__label">
      <input  value={formValue.password || ''} onChange={handleChange}  type="password" className="form__input form__input_el_password form__input-dark" name="password"
          placeholder="Пароль" required="required" minLength="2" maxLength="200"
          id="password-input"/>
      <span className="form__input-error password-input-error"></span>
    </label>
              <button type="submit" className="form__submit-button form__submit-button-dark">Войти</button>
          </form>
      </div>
  );
}

export default Login;