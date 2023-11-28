import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";



const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];




 const cardSelector = "#card-template";
 

 

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const addCardModal = document.querySelector("#add-card-modal");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModal = document.querySelector("#edit-modal-close-button");
const addCardCloseModal = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const previewCardModal = document.querySelector("#preview-card-modal");
const previewModalContainer = previewCardModal.querySelector("#modal__container-preview");
const previewImageEl = previewModalContainer.querySelector(".modal__preview-image");
const previewHeadingEl = previewModalContainer.querySelector(".modal__preview-heading");
const previewCloseModal = document.querySelector("#modal-image-close-button");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTitleInput = addCardFormElement.querySelector("#profile-name-input");
const cardUrlInput = addCardFormElement.querySelector("#profile-url-input");



const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",  
};


const profileEditElement = profileEditModal.querySelector('.modal__form');
const addFormElement = addCardModal.querySelector('.modal__form');

const editFormValidator = new FormValidator(validationSettings, profileEditElement);
const addFormValidator = new FormValidator(validationSettings, addFormElement);
//addFormValidator.resetValidation();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */



function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, cardSelector);
  cardListEl.prepend(card.getView());
}



function handleEscape(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector('.modal_opened');
    closePopup(modal);
  }
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener('keydown', handleEscape);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener('keydown', handleEscape);
}



[profileEditModal, addCardModal, previewCardModal].forEach((modalElement) => {
      modalElement.addEventListener("click", (evt) => {
        if (
          evt.target.classList.contains("modal") ||
          evt.target.classList.contains("modal__close")
        ) {
          closePopup(modalElement);
        }
      });
    });

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });
//   cardImageEl.setAttribute("src", cardData.link);
//   cardImageEl.setAttribute("alt", cardData.name);
//   cardTitleEl.textContent = cardData.name;


//   cardImageEl.addEventListener("click", () => {
//     previewImageEl.src = cardData.link;
//     previewImageEl.alt = cardData.name;
//     previewHeadingEl.textContent = cardData.name;
//     openPopup(previewCardModal);
//   });
//   return cardElement;
// }

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  addCardFormElement.reset();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

