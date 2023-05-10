import  { useState}  from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({onAddCard, isOpen, onClose}){
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleName(e) {
        setName(e.target.value);
      }

      function handleLink(e) {
        setLink(e.target.value);
      }

    function handleSubmit(e){
        e.preventDefault();
        onAddCard({name, link})
    }

    return(  
        <PopupWithForm title="Новое Место" text="Создать" name="add" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
        <label className="popup__label">
          <input onChange={handleName} type="text" className="popup__input popup__input_el_picture" name="name"
              placeholder="Название" required="required" id="picture-input" minLength="2" maxLength="30"/>
          <span className="popup__input-error picture-input-error"></span>
      </label>
      <label className="popup__label">
          <input onChange={handleLink} type="url" className="popup__input popup__input_el_link" name="link"
              placeholder="Ссылка на картинку" required="required" id="link-input"/>
          <span className="popup__input-error link-input-error"></span>
      </label>
        </PopupWithForm>
        )
}

export default AddPlacePopup;