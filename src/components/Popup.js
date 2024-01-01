export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }
    open() {
        this._popupElement.classList.add("modal__form");
        document.addEventListener("keydown", this._handleEscape);
    }

    close() {
        this._popupElement.classList.remove("modal__form");
        document.removeEventListener("keydown", this._handleEscape); 
    }

    _handleEscape = (evt) => {
        if (evt.key === "Escape") {
            this.close();
          } 
    }

    setEventListeners() {
        this._popupElement.addEventListener("click", (evt) => {
        if (
         evt.target === this._popupElement ||
         evt.target.classList.contains("modal__close")
        ) {
            this.close();
        }
          });
    }
}
