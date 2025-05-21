import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/formValidator.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { UserInfo } from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import {
    galeryItems,
    editButton,
    addButton,
    imageModal,
    titleImageModal,
} from from '../scripts/utils.js';


const popupProfile = document.querySelector("#popup-profile");
const profileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileHobbie = document.querySelector(".profile__hobbie");
const inputName = document.querySelector("#input-name");
const inputHobbie = document.querySelector("#input-hobbie");
const formProfile = document.querySelector("#form-profile");
const closeButton = document.querySelector(".form__close-button-profile");
const cardContainer = document.querySelector(".elements__container");
const popupAddCard = document.querySelector("#popup-add-card");
const formAddCard = document.querySelector("#form-addCard");
const addButton = document.querySelector(".profile__add-button");
const inputCardName = document.querySelector("#input-card-name");
const inputLink = document.querySelector("#input-card-link");
const closeAddCardButton = document.querySelector(
  ".form__close-button-addCard"
);

const createButton = document.querySelector(".form__submit");
const popupCardImage = document.querySelector("#popup-show-card");
const popupCardClose = document.querySelector(".popup__close-card");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, formAddCard);
addCardFormValidator.enableValidation();

function createCard(link, name) {
  const card = new Card(name, link, "#template__card", (link, name) => {
    openPopup(popupCardImage);
    popupCardImage.querySelector(".popup__photo-link").src = link;
    popupCardImage.querySelector(".popup__photo-link").alt = name;
    popupCardImage.querySelector(".popup__photo-name").textContent = name;
  });
  return card.generateCard();
}

initialCards.forEach(function (element) {
  const newCard = createCard(element.link, element.name);
  cardContainer.prepend(newCard);
});

profileButton.addEventListener("click", function () {
  inputName.textContent = profileName.value;
  inputHobbie.textContent = profileHobbie.value;
  openPopup(popupProfile);
});

function closeAnyPopup(popup) {
  closePopup(popup);
}

closeButton.addEventListener("click", function () {
  closeAnyPopup(popupProfile);
});
closeAddCardButton.addEventListener("click", function () {
  closeAnyPopup(popupAddCard);
});
popupCardClose.addEventListener("click", function () {
  closeAnyPopup(popupCardImage);
});

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileHobbie.textContent = inputHobbie.value;
  closePopup(popupProfile);
});

addButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

formAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputLink.value;

  if (name && link) {
    const newCard = createCard(link, name);
    cardContainer.prepend(newCard);
    inputCardName.value = "";
    inputLink.value = "";
    closePopup(popupAddCard);
  }
});

popupAddCard
  .querySelector(".popup__overlay")
  .addEventListener("click", function () {
    closePopup(popupAddCard);
  });

popupProfile
  .querySelector(".popup__overlay")
  .addEventListener("click", function () {
    closePopup(popupProfile);
  });

popupCardImage
  .querySelector(".popup__overlay")
  .addEventListener("click", function () {
    console.log("hola");
    closePopup(popupCardImage);
  });

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup(popupAddCard);
    closePopup(popupProfile);
    closePopup(popupCardImage);
  }
});

inputName.addEventListener("keydown", (evt) => submitOnEnter(evt, formProfile));
inputHobbie.addEventListener("keydown", (evt) =>
  submitOnEnter(evt, formProfile)
);
inputCardName.addEventListener("keydown", (evt) =>
  submitOnEnter(evt, formAddCard)
);
inputLink.addEventListener("keydown", (evt) => submitOnEnter(evt, formAddCard));

const userInfo = new UserInfo({
  nameSelector: "#name",
  descriptionSelector: "#description",
});

const popupEditForm = new PopupWithForm(".modal", ({ nombre, descripcion }) => {
  userInfo.setUserInfo({ name: nombre, description: descripcion });
});

popupEditForm.setEventListeners();

editButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  document.querySelector("#nombre").value = name;
  document.querySelector("#descripcion").value = about;
  popupEditForm.open();
});
