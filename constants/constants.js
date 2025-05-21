export const profile = document.querySelector('.profile');
export const name = profile.querySelector('.profile__info-name');
export const description = profile.querySelector('.profile__info-description');
export const editButton = profile.querySelector('.profile__edit-button');
export const addButton = profile.querySelector('.profile__add-button');

export const modalEdit = document.getElementById('modal-edit-all').querySelector('.modal');
export const modalAdd = document.getElementById('modal__add-all').querySelector('.modal__add');

export const close = modalEdit.querySelector('.close');

export const modalImage = document.getElementById('popupimg');
export const imageModal = modalImage.querySelector('.popupimg__content-image');
export const closeImageModal = modalImage.querySelector('.popupimg__content-close');
export const titleImageModal = modalImage.querySelector('.popupimg__content-title');

export const galeryItems = [
    { title: "Valle de Yosemite", link: "image/Lugar 1.png" },
    { title: "Lago Louise", link: "image/Lugar 2.png" },
    { title: "Montañas Calvas", link: "image/Lugar 3.png" },
    { title: "Latemar", link: "image/Lugar 4.png" },
    { title: "Vanoise National Park", link: "image/Lugar 5.png" },
    { title: "Lago di Braies", link: "image/Lugar 6.png" },
];