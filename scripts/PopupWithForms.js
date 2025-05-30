import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__submit");
    this._submitButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  _toggleLoadingState(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._toggleLoadingState(true);
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => console.error("Error al enviar formulario:", err))
        .finally(() => this._toggleLoadingState(false));
    });
  }
  close() {
    super.close();
  }
}
