import Popup from "./Popup";

export default class PopupDeleteConfirm extends Popup {
constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button");  
}


setSubmitAction(action) {
    this._handleFormSubmit = action;
}

setEventListeners() {
    this._popupForm.addEvenListener("submit", (evt) => {
        evt.preventDefault();
        this.setSubmitAction(); 
        this._handleFormSubmit();  
    });
    super.setEventListeners();
}

}

