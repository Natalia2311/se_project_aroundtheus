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
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit();
        this.close();  
    });
  
}

// deleteCard() {
// this._deleteButton.addEvenListener("submit",
//     this._cardElement.remove(),
//     this._cardElement = null
// );
// }

}

