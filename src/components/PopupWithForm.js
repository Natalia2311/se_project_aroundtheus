import Popup from "./Popup";

class PopupWithForm extends Popup {
constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
}
close() {
    this._popupForm.reset();
    super.close();
}

_getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
        inputValues[input.name] = input.value;
    });
    return inputValues;
}
setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
});
super.setEventListeners();
}
}

export default PopupWithForm



// export class PopupWithForm extends Popup {
//     constructor(
//       { popupSelector, handleFormSubmit } // this is where you declas/setup methods
//     ) {
//       super({ popupSelector }); // { popupSelector: "#add-card-modal"}
//       this.popupSelector = document.querySelector(".modal");
//       this._handleFormSubmit = handleFormSubmit;
//       this._popupForm = this._popupElement.querySelector(".modal__form");
//       this._saveButtons = saveButtons;
//     }
  
//     // all your other code logic here
//   }
  