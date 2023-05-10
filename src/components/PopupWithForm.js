
function PopupWithForm(props) {
      const className = `popup popup_${props.name} ${props.isOpen && `popup_opened`}`

    return (
        <div className= {className} >
        <div className="popup__body">
            <h2 className="popup__header">{`${props.title}`}</h2>
            <form action="submit" className="popup__form popup__form-profile" name={`${props.name}`} noValidate onSubmit={props.onSubmit}>
                {props.children}
                <button type="submit" className="popup__submit-button popup__submit-button_profile">{props.text}</button>
            </form>
            <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        </div>
    </div>
    
    );
  }
  
  export default PopupWithForm;





