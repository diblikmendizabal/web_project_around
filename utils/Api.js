class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        return result;
      });
  }
  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        return result;
      });
  }
  updateUserProfile(name, about) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log("Perfil actualizado:", result);
        return result;
      });
  }
  addNewCard(name, link) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        if (!res.ok) {
          return res
            .json()
            .then((err) =>
              Promise.reject(`Error: ${err.message || res.status}`)
            );
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error al agregar la tarjeta:", err);
        return Promise.reject(err);
      });
  }
  toggleLike(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error al alternar 'me gusta':", err);
        return Promise.reject(err);
      });
  }
  updateUserAvatar(avatarUrl) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log("Avatar actualizado:", result);
        return result;
      });
  }
  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "287b256e-914c-4df1-a505-e027a285fad7",
    "Content-Type": "application/json",
  },
});
