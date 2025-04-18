const openPopup = document.querySelector(".popup");
const buttonPopup = document.querySelector(".profile__info-button");
const buttonClosePopup = document.querySelector(".popup__button-close");
const displayName = document.querySelector(".profile__details-name");
const displayDescription = document.querySelector(
  ".profile__details-description"
);

const gallery = document.querySelector(".gallery");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__form-name");
const jobInput = document.querySelector(".popup__form-occupation");
const buttonSubmit = document.querySelector(".popup__form-button");
const openPopupAdd = document.querySelector(".popup-add");
const buttonAdd = document.querySelector(".profile__info-button-add");
const buttonCloseAdd = document.querySelector(".popup-add__button-close");
const buttonSubmitAdd = document.querySelector(".popup-add__form-button");
const formAdd = document.querySelector(".popup-add__form");
const descriptionInput = document.querySelector(".popup-add__form-name");
const imageInput = document.querySelector(".popup-add__form-occupation");
const openPopupImage = document.querySelector(".popup__image");
const imageButtonClose = document.querySelector(".popup__image-button-close");

const page = document.querySelector(".page");


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

function handlePopupOpen() {
  openPopup.classList.add("popup_opened");
}

function handlePopupClose() {
  openPopup.classList.remove("popup_opened");
}

function editProfile() {
  handlePopupOpen();
  nameInput.value = displayName.textContent;
  jobInput.value = displayDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  displayName.textContent = nameInput.value;
  displayDescription.textContent = jobInput.value;
  openPopup.classList.remove("popup_opened");
}

function handlePopupAddOpen() {
  openPopupAdd.classList.add("popup-add_opened");
}

function handlePopupAddClose() {
  openPopupAdd.classList.remove("popup-add_opened");
}

function addCards() {
  initialCards.forEach((item) => {
    const card = createCard(item.name, item.link);
    gallery.append(card);
    openPopupAdd.classList.remove("popup-add_opened");
  });
}

function createCard(name, link) {
  const templateGallery = document.querySelector("#template").content;
  const card = templateGallery.querySelector(".gallery__card").cloneNode(true);
  const cardImage = card.querySelector(".gallery__card-image");
  const cardText = card.querySelector(".gallery__card-name");
  const deleteButton = card.querySelector(".gallery__card-delete");
  const like = card.querySelector(".gallery__card-like");
  cardImage.src = link;
  cardImage.alt = name;
  cardText.textContent = name;
  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  like.addEventListener("click", () => {
    like.classList.toggle("gallery__card-like-active");
  });

  cardImage.addEventListener("click", () => {
    handlePopupImageOpen(name, link);
  });

  return card;
}

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard(descriptionInput.value, imageInput.value);
  gallery.prepend(card);
  openPopupAdd.classList.remove("popup-add_opened");
}

function handlePopupImageOpen(name, link) {
  const popupImg = openPopupImage.querySelector(".popup__img");
  const popupText = openPopupImage.querySelector(".popup__text");
  const imageContainer = document.querySelector(
    ".popup__image popup__image_opened"
  );
  popupImg.src = link;
  popupImg.alt = name;
  popupText.textContent = name;
  openPopupImage.classList.add("popup__image_opened");
}

function handlePopupImageClose() {
  openPopupImage.classList.remove("popup__image_opened");
}

buttonPopup.addEventListener("click", handlePopupOpen);
buttonPopup.addEventListener("click", editProfile);
buttonClosePopup.addEventListener("click", handlePopupClose);
formElement.addEventListener("submit", handleProfileFormSubmit);
buttonAdd.addEventListener("click", handlePopupAddOpen);
buttonCloseAdd.addEventListener("click", handlePopupAddClose);
addCards();
formAdd.addEventListener("submit", handleImageFormSubmit);
imageButtonClose.addEventListener("click", handlePopupImageClose);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    openPopup.classList.remove("popup_opened");
    openPopupAdd.classList.remove("popup-add_opened");
    openPopupImage.classList.remove("popup__image_opened");
  }
});

document.addEventListener("click", (event) => {
  if (openPopup === event.target) {
    openPopup.classList.remove("popup_opened");
  }

  if (openPopupAdd === event.target) {
    openPopupAdd.classList.remove("popup-add_opened");
  }

  if (openPopupImage === event.target) {
    openPopupImage.classList.remove("popup__image_opened");
  }
});

const formNameMessage = document.querySelector(".popup__form-name-message");
const formOccupationMessage = document.querySelector(
  ".popup__form-occupation-message"
);
const formTitleMessage = document.querySelector(
  ".popup-add__form-name-message"
);
const formUrlMessage = document.querySelector(
  ".popup-add__form-occupation-message"
);

buttonPopup.addEventListener("click", () => {
  enableValidation({
    nameSelector: ".popup__form-name",
    occupationSelector: ".popup__form-occupation",
    errorMessageNameSelector: ".popup__form-name-message",
    errorMessageOccupationSelector: ".popup__form-occupation-message",
    submitButtonSelector: ".popup__form-button",
  });
});

buttonAdd.addEventListener("click", () => {
  enableValidation({
    nameSelector: ".popup-add__form-name",
    occupationSelector: ".popup-add__form-occupation",
    errorMessageNameSelector: ".popup-add__form-name-message",
    errorMessageOccupationSelector: ".popup-add__form-occupation-message",
    submitButtonSelector: ".popup-add__form-button",
  });
});

function enableValidation(validationData) {
  const submitButton = document.querySelector(
    validationData.submitButtonSelector
  );
  const name = document.querySelector(validationData.nameSelector);
  const formNameMessage = document.querySelector(
    validationData.errorMessageNameSelector
  );
  name.addEventListener("input", (event) => {
    const isValid = name.validity.valid;
    if (isValid) {
      formNameMessage.classList.add("hidden-message");
      submitButton.disabled = false;
    } else {
      formNameMessage.classList.remove("hidden-message");
      submitButton.disabled = true;
    }
  });

  const occupation = document.querySelector(validationData.occupationSelector);
  const formOccupationMessage = document.querySelector(
    validationData.errorMessageOccupationSelector
  );
  occupation.addEventListener("input", (event) => {
    const isValid = occupation.validity.valid;
    if (isValid) {
      formOccupationMessage.classList.add("hidden-message");
      submitButton.disabled = false;
    } else {
      formOccupationMessage.classList.remove("hidden-message");
      submitButton.disabled = true;
    }
  });
}