const openPopup = document.querySelector(".popup");
const buttonPopup = document.querySelector(".profile__edit-button");
const buttonClosePopup = document.querySelector(".popup__button-close");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__form-input-name");
const jobInput = document.querySelector(".popup__form-input-job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const buttonSubmit = document.querySelector(".popup__submit-button");

const openPopupAdd = document.querySelector(".popup__add");
const formAdd = document.querySelector(".popup__add-form");
const addName = document.querySelector(".popup__add-form-input-name");
const addImage = document.querySelector(".popup__add-form-input-image");
const buttonSubmitAdd = document.querySelector(".popup__add-submit-button");
const buttonCloseAdd = document.querySelector(".popup__add-button-close");

const openPopupImage = document.querySelector(".popup__image");
const closePopupImage = document.querySelector(".popup__image-button-close");

const buttonAddProfile = document.querySelector(".profile__add-button");

const gallery = document.querySelector(".gallery");
const galleryTemplate = document.querySelector(".gallery__template");

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

function openPopupProfile() {
  handlePopupOpen();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handlePopupOpen() {
  openPopup.classList.add("popup_opened");
}

function handlePopupClose() {
  openPopup.classList.remove("popup_opened");
}

function handlePopupAddOpen() {
  openPopupAdd.classList.add("popup__add_opened");
}

function handlePopupAddClose() {
  openPopupAdd.classList.remove("popup__add_opened");
}

function addCards() {
  initialCards.forEach((item) => {
    const card = createCard(item.name, item.link);
    gallery.append(card);
    openPopupAdd.classList.remove("popup__add_opened");
  });
}

function createCard(data) {
  /*crea las cartas*/
  const templateGallery = document.querySelector("#template").content;
  const card = templateGallery
    .querySelector(".gallery__card")
    .cloneNode(true); /*Ingresa a template*/
  const cardImage = card.querySelector(
    ".gallery__card-image"
  ); /*selecciona la img*/
  const cardName = card.querySelector(".gallery__card-name");
  const cardLike = card.querySelector(".gallery__card-icon");
  const cardDelete = card.querySelector(".gallery__card-delete");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardName.textContent = data.name;

  cardDelete.addEventListener("click", () => {
    card.remove();
  });
  cardLike.addEventListener("click", () => {
    cardLike.classList.toggle("gallery__card-icon-active");
  });
  cardImage.addEventListener("click", () => {
    handlePopupImageOpen(data.name, data.link);
  });

  return card;
}
/*arreglar*/
initialCards.forEach(function (card) {
  const cardElement = createCard(card);
  const cards = document.querySelector(".gallery");
  cards.prepend(cardElement);
});

function handleProfileFormSubmit(evt) {
  /*popup editar*/
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openPopup.classList.remove("popup_opened");
}

function handlePopupImageOpen(name, link) {
  const popupImg = openPopupImage.querySelector(".popup__img");
  const popupText = openPopupImage.querySelector(".popup__text");
  popupImg.src = link;
  popupImg.alt = name;
  popupText.textContent = name;
  openPopupImage.classList.add("popup__image_opened");
}

function handlePopupImageClose() {
  openPopupImage.classList.remove("popup__image_opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
buttonPopup.addEventListener("click", handlePopupOpen);
buttonClosePopup.addEventListener("click", handlePopupClose);

buttonAddProfile.addEventListener("click", handlePopupAddOpen);
buttonCloseAdd.addEventListener("click", handlePopupAddClose);

formAdd.addEventListener("submit", handleProfileFormSubmit);
closePopupImage.addEventListener("click", handlePopupImageClose);