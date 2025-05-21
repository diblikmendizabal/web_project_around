export class Card {
    constructor(item, templateId, handleCardClick) {
        this._item = item = [];
        this._templateId = document.getElementById(templateId).content;
        this._handleCardClick = handleCardClick;
    }


    _addLikeButton() {
        this._itemClone.querySelector(".galery__item-like-button").addEventListener('click', function () {
            this.classList.toggle('liked');
        });
    }

    removeCard(index) {
        this._item.splice(index, 1);
        this._itemClone.remove()
    }

    _addDeleteButton(index) {
        this._itemClone.querySelector(".galery__item-delete-button").addEventListener('click', () => {
            this.removeCard(index);
        });
    }


    addCard(item, index) {
        this._itemClone = this._templateId.cloneNode(true).firstElementChild;
        this._itemClone.querySelector('.galery__item-image').src = item.link;
        this._itemClone.querySelector('.galery__item-image').alt = item.title;
        this._itemClone.querySelector('.galery__item-name').textContent = item.title;

        this._addLikeButton(this._itemClone);
        this._addDeleteButton(this._itemClone, index);
        this._itemClone.querySelector('.galery__item-image').addEventListener('click', () => {
            this._handleCardClick(item.link, item.title);
        });

        return this._itemClone;
    }
}

