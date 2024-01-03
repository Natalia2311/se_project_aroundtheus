import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImageEl = document.querySelector(".modal__preview-image");
    this._previewHeadingEl = document.querySelector(".modal__preview-heading");
  }

  open(link, name) {
    this._previewImageEl.src = link;
    this._previewImageEl.alt = name;
    this._previewHeadingEl.textContent = name;
    super.open();
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