import  { useRef}  from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props){
    const inputRef = useRef('');
    function handleSubmit(e){
        e.preventDefault();
        props.onUpdateAvatar(inputRef.current.value)
    }

    return(  
        <PopupWithForm title="Обновить Аватар" text="Сохранить" name="avatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                   <label className="form__label">
                     <input ref={inputRef} type="url" className="form__input form__input_el_link" name="link"
                         placeholder="Ссылка на Аватар" required="required" id="avatar-input"/>
                     <span className="form__input-error avatar-input-error"></span>
                   </label>
      </PopupWithForm>
        )
}

export default EditAvatarPopup;