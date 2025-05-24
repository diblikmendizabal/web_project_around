import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/formValidator.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { UserInfo } from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import Api from '../scripts/Api.js';
import {
    editButton,
    addButton,
    imageModal,
    titleImageModal,
} from '../constants/constants.js';

const api = new Api({
    baseUrl: 'https://around-api.es.tripleten-services.com/v1',
    headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: '287b256e-914c-4df1-a505-e027a285fad7'
    }
});

const forms = document.querySelectorAll('.form');
forms.forEach(form => {
    const validator = new FormValidator(`.${form.classList[0]}`);
    validator.enableValidation();
});

const popupimage = new PopupWithImage('.popupimg', (data) => {
    imageModal.src = data.src;
    imageModal.alt = data.alt;
    titleImageModal.textContent = data.caption;
});

const renderGalery = new Section({
    items: [],
    renderer: (item) => {
        console.log(item);
        const card = new Card(
            item,
            'galery',
            (link, name) => {
                popupimage.open({ src: link, alt: name, caption: name })
                popupimage.setEventListeners();
            })

        return card.addCard(item);
    }
}, '#galery__content'
);

renderGalery.rendererItems();

api.getCards()
    .then(cards => {
        renderGalery._items = cards;
        renderGalery.rendererItems();
    })
    .catch(err => console.error('Error al cargar las tarjetas:', err));

const popupForm = new PopupWithForm('.modal__add', (data) => {
    const nombre = data.title;
    const image = data.link;
    const item = { name: nombre, link: image };
    console.log(item);
    api.createNewCard(item)
        .then((cardNew) => {
            console.log(cardNew);
            const newitem = new Card(
                cardNew,
                'galery',
                (link, name) => {
                    popupimage.open({ src: link, alt: name, caption: name })
                    popupimage.setEventListeners();
                }).addCard(cardNew);
            renderGalery.addItem(newitem);
        })
        .catch(err => console.error('Error al crear la tarjeta:', err))
}
);

addButton.addEventListener('click', () => {
    popupForm.open();
});

popupForm.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '#name',
    descriptionSelector: '#description'
    , avatarSelector: '.profile__image'
});

api.getUserInfo()
    .then(user => {
        userInfo.setUserInfo({ name: user.name, description: user.about });
        userInfo.setAvatar(user.avatar);
    });

const popupEditForm = new PopupWithForm('.modal', ({ nombre, descripcion }) => {
    userInfo.setUserInfo({ name: nombre, description: descripcion });
    api.changeUserInfo({ name: nombre, about: descripcion })
});

popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo();
    document.querySelector('#nombre').value = name;
    document.querySelector('#descripcion').value = about;
    popupEditForm.open();
});

const popupModalImage = new PopupWithForm('.modal__image', (data) => {
    const avatarUrl = data.avatar
    api.updateProfile({ avatar: avatarUrl })
        .then((user) => {
            document.querySelector('.profile__image').src = user.avatar;
        })
        .catch(err => console.error('Error al actualizar el avatar:', err))
});

popupModalImage.setEventListeners();

imageButton.addEventListener('click', () => {
    popupModalImage.open();
});