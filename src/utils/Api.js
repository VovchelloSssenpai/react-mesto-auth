 class Api {
  constructor({ baseUrl, headers }) {
    this.Url = baseUrl;
    this.headers = headers;
    this.authorization = headers.authorization;
    this.contentType = headers["Content-Type"];
    this.profileURL = `${baseUrl}/users/me`;
    this.imageUrl = `${this.Url}/cards`;
  }

_checkResponse(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

  getInitialProfileData() {
    return fetch(this.profileURL, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getInitialImages() {
    return fetch(this.imageUrl, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(this.profileURL, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addNewImage({ name, link }) {
    return fetch(this.imageUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteImage(cardID) {
    return fetch(`${this.imageUrl}/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  placeLike(cardID) {
    return fetch(`${this.imageUrl}/${cardID}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  removeLike(cardID) {
    return fetch(`${this.imageUrl}/${cardID}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  updateAvatar(link) {
    return fetch(`${this.profileURL}/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

 changeLikeCardStatus(cardId, isLiked){
  if(isLiked){return this.placeLike(cardId)} else{ return this.removeLike(cardId)}
 }

register(data){
  return fetch(`${this.Url}/signup`, {
    method: "POST",
    headers: this.headers,
    body: JSON.stringify(data)
  }).then(this._checkResponse);
 
}

authorize(data){
  return fetch(`${this.Url}/signin`, {
    method: "POST",
    headers: this.headers,
    body: JSON.stringify(data)
  }).then(this._checkResponse);
}

authorizationCheck(data){
  return fetch(`${this.Url}/users/me`, {
    method: "GET",
    headers: {"Content-Type": "application/json",
              "Authorization" : `Bearer ${data}`}
  }).then(this._checkResponse);
}
}

const api = new Api({ baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
headers: {
  authorization: "fb85a167-fa0c-4b77-b6c4-6e80ca894d63",
  "Content-Type": "application/json",
},});


const authApi = new Api({baseUrl: "https://auth.nomoreparties.co", 
headers: {
  "Content-Type": "application/json" }})

export  {api, authApi};