
function Login(props) {
   

  return (
   
      <div className="login">
          <h2 className="login__header">Вход</h2>
          <form action="submit" className="login__form" noValidate >
          <label className="login__label">
      <input type="text" className="login__input login__input_el_email" name="name" placeholder="Имя"
          required="required" minLength="2" maxLength="40" id="name-input" />
      <span className="login__input-error email-input-error"></span>
    </label>
    <label className="login__label">
      <input   type="text" className="login__input login__input_el_password" name="profession"
          placeholder="О себе" required="required" minLength="2" maxLength="200"
          id="profession-input"/>
      <span className="login__input-error password-input-error"></span>
    </label>
              <button type="submit" className="login__submit-button popup__submit-button_profile">Войти</button>
          </form>
      </div>
  
  );
}

export default Login;