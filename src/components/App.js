import './index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import api from '../utils/Api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import { CardContext } from '../contexts/CardContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {

  // GETTING PROFILE DATA
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getInitialProfileData()
      .then(data => {
        setCurrentUser(data);    
      })
      .catch(error => console.error(error));
  }, []);


// GETTING INITIAL IMAGES DATA

const [card, setCard] = useState([])

useEffect(()=>{
    api.getInitialImages().then(data => {
        setCard(data);
    }).catch(error => console.error(error));
}, [])

// LIKE FUNCTION

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
  }).catch(error => console.error(error));
}

// DELETE FUNCTION
function handleCardDelete(card){
  api.deleteImage(card._id).then(
    setCard(prevState => prevState.filter((el) => el._id !== card._id)),    
    ).catch(error => console.error(error))
}

// UPDATE USER
function handleUpdateUser(userInfo){
api.setUserInfo(userInfo).then((updated)=>{
  setCurrentUser(updated); closeAllPopups();
}).catch(error => console.error(error))
}

// UPDATE AVATAR
function handleUpdateAvatar(avatarLink){
  api.updateAvatar(avatarLink).then((updated)=>{setCurrentUser(updated); closeAllPopups()}).catch(error => console.error(error))
}

// NEW IMAGE STATE
function handleAddingNewCard(cardData){
  api.addNewImage(cardData).then((updated)=>{setCard([updated, ...card]); closeAllPopups()})
}


const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
const [selectedCard, setSelectedCard] = useState({});
const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);


function handleAvatarEditClick(){
  setIsEditAvatarPopupOpen(true);  
}
function handleProfileEditClick(){
  setIsEditProfilePopupOpen(true)
}
function handleCardAddClick(){
  setIsAddCardPopupOpen(true)
}
function handleCardClick(card){
  setSelectedCard(card)
  setIsImagePopupOpen(true);
}


const closeAllPopups = function(){
  setIsEditAvatarPopupOpen(false);  
  setIsEditProfilePopupOpen(false)
  setIsAddCardPopupOpen(false)
  setIsImagePopupOpen(false)
}


  return (
    <div className="App">
      <div className='root'>
      <div className='page'>
      <CurrentUserContext.Provider value={currentUser} >
      <CardContext.Provider value={card}>
      <Header />
      <Main onEditAvatar={handleAvatarEditClick} 
            onEditProfile={handleProfileEditClick} 
            onAddPlace={handleCardAddClick} 
            onCardClick={handleCardClick} 
            onCardLike={handleCardLike} 
            onDeleteClick={handleCardDelete}  />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={closeAllPopups} onAddCard={handleAddingNewCard} />

      <PopupWithForm title="Вы уверены?" text="Удалить" name="delete" onClose={closeAllPopups}>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} ></ImagePopup>
      </CardContext.Provider>
      </CurrentUserContext.Provider>
      </div>
      </div>
    </div>
  );
}

export default App;
