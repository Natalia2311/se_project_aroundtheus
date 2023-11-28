
class Card {
   constructor(cardData, cardSelector) {
      this._name = cardData.name;
      this._link = cardData.link;
      this._cardSelector = cardSelector;
   }  
  
_setEventListeners() {
 this._cardElement.querySelector("card__like-button").addEventListener("click", () => {
    this._handleLikeIcon();
   });

 this._cardElement.querySelector("card__delete-button").addEventListener("click", () => {
    this._handleDeleteCard();
   });
   this._cardElement.querySelector(".card__image").addEventListener("click", () => {
      this._handlePreviewPicture(this._name, this._link);
     });

}

   
_handleDeleteCard() {
this._cardElement.remove();
this._cardElement = null;
}

_handleLikeIcon() {
this._cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_active");
}

_handlePreviewPicture() {
   this._cardElement.querySelector(".card__image").classList.add(openPopup);
}

_getElement() {
   return
   document.querySelector(this._cardSelector)
   .content.querySelector(".card")
   .cloneNode(true); 
   
}

getView() {
  this._cardElement = this._getElement;
  const cardImageEl = this._cardElement.querySelector(".card__image");
  const cardTitleEl = this._cardElement.querySelector(".card__title");
  const likeButton = this._cardElement.querySelector(".card__like-button");
  const deleteButton = this._cardElement.querySelector(".card__delete-button");
  previewImageEl.src = this._link;
  previewImageEl.alt = this._name;
  previewHeadingEl.textContent = this._name;

    this._setEventListeners ();
   
    return this_cardElement
}
}
export default Card;


