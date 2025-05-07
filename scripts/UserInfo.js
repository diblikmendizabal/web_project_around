export class UserInfo {
  constructor({ nameSelector, hobbieSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._hobbieElement = document.querySelector(hobbieSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      hobbie: this._hobbieElement.textContent,
    };
  }

  setUserInfo({ name, hobbie }) {
    this._nameElement.textContent = name;
    this._hobbieElement.textContent = hobbie;
  }
}
