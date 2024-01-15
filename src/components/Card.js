class Card {
  constructor(cardData, cardSelector, handleImageClick, handleDeleteButton, handleCardLike) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.isLiked = cardData.isLiked;
    this._id = cardData._id;
    this._handleDeleteButton = handleDeleteButton;
    this._handleCardLike = handleCardLike;
  };

  setLikeStatus(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if(this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
     } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });
  

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton(this);
       
      });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name, this._id); 
    });
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _handleLikeIcon() {
  //   this._likeButton.classList.toggle("card__like-button_active");
  // }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getElement();
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._renderLikes();
    this._setEventListeners();
    

    return this._cardElement;
  }
}

export default Card;
