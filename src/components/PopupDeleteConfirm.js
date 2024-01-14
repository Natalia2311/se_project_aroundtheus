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
    this._submitButton.addEvenListener("click", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit();
        this.close();  
    });
    super.setEventListeners();
}

// deletecCard() {
// this._deleteButton.addEvenListener("submit",
//     this._cardElement.remove(),
//     this._cardElement = null
// );
// }

}

