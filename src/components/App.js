import './index.css';
import Header from './Header.js'
import Main from './Main.js'
import Login from './Login.js';
import Register from './Register.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import {api, authApi} from '../utils/Api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import { CardContext } from '../contexts/CardContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import {ProtectedRouteElement} from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'


function App() {
const navigate = useNavigate()


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


// LOGGED IN STATE
const [loggedIn, setLoggedIn] = useState(false);
const [profileData, setProfileData] = useState("")
const [authorizatioStatus, setAuthorizationStatus] = useState(false);
// Registration authorization

function handleRegistration(data){
 return authApi.register(data).then(data=>  {handleInfoTooltipPopupOpen(); setAuthorizationStatus(true) } ).catch(error => {console.error(error); handleInfoTooltipPopupOpen(); setAuthorizationStatus(false)})
}
function handleAuthorization(data){
  return authApi.authorize(data).then((res)=> {if (res.token){localStorage.setItem('token', res.token)} return res}).catch(error => {handleInfoTooltipPopupOpen(); setAuthorizationStatus(false)})
}

// TOKEN CHECK
const tokenCheck = () => {
  const token = localStorage.getItem('token');
  if (token){
    authApi.authorizationCheck(token).then((res)=>{
        setProfileData(res.data.email)
setLoggedIn(true);
navigate("/", {replace: true})
})}} 

useEffect(() => {
  tokenCheck();
  }, [])

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
const [selectedCard, setSelectedCard] = useState({});
const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
const [isInfoTooltipOpen, setInfoTooltip] = useState(false);

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

function handleInfoTooltipPopupOpen(){
  setInfoTooltip(true);
}

function handleLogIn(){
  setLoggedIn(true)
}

const closeAllPopups = function(){
  setIsEditAvatarPopupOpen(false);  
  setIsEditProfilePopupOpen(false)
  setIsAddCardPopupOpen(false)
  setIsImagePopupOpen(false)
  setInfoTooltip(false);
}


  return (
    <div className="App">
      <div className='root'>
      <div className='page'>
      <CurrentUserContext.Provider value={currentUser} >
      <CardContext.Provider value={card}>
      <Header loginStatus={loggedIn} setLoginStatus={setLoggedIn} profileData={profileData} setProfileData={setProfileData} />
      <Routes>
        <Route path='/' element={ loggedIn ?  <ProtectedRouteElement loggedIn={loggedIn} element={  
        Main  
        }
        onEditAvatar={handleAvatarEditClick} 
        onEditProfile={handleProfileEditClick} 
        onAddPlace={handleCardAddClick} 
        onCardClick={handleCardClick} 
        onCardLike={handleCardLike} 
        onDeleteClick={handleCardDelete}  
        />
      :
  <Navigate to="/sign-in" replace />
        }>
        </Route>
        <Route path='/sign-up' element={<Register onRegister={handleRegistration} />} ></Route>
        <Route path='/sign-in' element={<Login onAuthorize={handleAuthorization} handleLogin={handleLogIn} setProfileData={setProfileData} />} ></Route>
      </Routes>
    { loggedIn && <Footer />}
     
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={closeAllPopups} onAddCard={handleAddingNewCard} />
      <PopupWithForm title="Вы уверены?" text="Удалить" name="delete" onClose={closeAllPopups}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} authorizationStatus={authorizatioStatus} />
      </CardContext.Provider>
      </CurrentUserContext.Provider>
      </div>
      </div>
    </div>
  );
}

export default App;
