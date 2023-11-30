
class Card {
   constructor(cardData, cardSelector) {
      this._name = cardData.name;
      this._link = cardData.link;
      this._cardSelector = cardSelector;
      
   }  
  
_setEventListeners() {
 this._cardElement.querySelector(".card__like-button").addEventListener("click", () => {
    this._handleLikeIcon();
   });

 this._cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    this._handleDeleteCard();
   });
   this._cardElement.querySelector(".card__image").addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
     });

}

   
_handleDeleteCard() {
this._cardElement.remove();
this._cardElement = null;
}

_handleLikeIcon() {
this._cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_active");
}

_handleImageClick() {
   this._cardElement.querySelector(".card__image").classList.add("modal_opened");
}


_getElement() {
  return document.querySelector(this._cardSelector)
   .content.querySelector(".card")
   .cloneNode(true); 
  
}

getView() {
  this._cardElement = this._getElement();
  this._cardImageEl = this._cardElement.querySelector(".card__image");
  this._cardTitleEl = this._cardElement.querySelector(".card__title");
  this._likeButton = this._cardElement.querySelector(".card__like-button");
  this._deleteButton = this._cardElement.querySelector(".card__delete-button");
  this._cardImageEl.src = this._link;
  this._cardImageEl.alt = this._name;
  this._cardTitleEl.textContent = this._name;

    this._setEventListeners();
   
    return this._cardElement;
}
}
export default Card;


