import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });
        this._popupImage = this._popupElement.querySelector(".modal__preview-image");
        this._popupTitle = this._popupElement.querySelector(".modal__preview-heading");
    }

open(link, name){
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
    super.open();
}

}



