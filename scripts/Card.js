export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(cardElement) {
    const btnLike = cardElement.querySelector(".element__photo-like");
    const btnDelete = cardElement.querySelector(".element__photo-trash");
    const cardImage = cardElement.querySelector(".element__photo-link");

    btnLike.addEventListener("click", () => {
      btnLike.classList.toggle("element__photo-like_active");
    });

    btnDelete.addEventListener("click", () => {
      cardElement.remove();
    });

    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__photo-link").src = this._link;
    this._element.querySelector(".element__photo-link").alt = this._name;
    this._element.querySelector(".element__photo-name").textContent =
      this._name;

    this._setEventListeners(this._element);

    return this._element;
  }
}