export function openPopup(popup) {
  popup.classList.add("popup__show");
}

export function closePopup(popup) {
  popup.classList.remove("popup__show");
}

export function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    if (popupCardImage) {
      closePopup(popupCardImage);
    }
    if (popupProfile) {
      closePopup(popupProfile);
    }
    if (popupAddCard) {
      closePopup(popupAddCard);
    }
  }
}

export function submitOnEnter(evt, form) {
  if (evt.key === "Enter") {
    evt.preventDefault();
    form.requestSubmit();
  }
}
