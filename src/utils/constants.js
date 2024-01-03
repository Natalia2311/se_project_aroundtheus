export const initialCards = [
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

export const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

export const addCardModal = document.querySelector("#add-card-modal");
export const cardListEl = document.querySelector(".cards__list");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditForm = document.forms["profile-form"];
export const profileEditButton = document.querySelector(
  "#profile__edit-button"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
export const previewCardModal = document.querySelector("#preview-card-modal");
export const previewModalContainer = previewCardModal.querySelector(
  "#modal__container-preview"
);
export const previewImageEl = previewModalContainer.querySelector(
  ".modal__preview-image"
);
export const previewHeadingEl = previewModalContainer.querySelector(
  ".modal__preview-heading"
);
export const cardTitleInput = document.querySelector("#profile-name-input");
export const cardUrlInput = document.querySelector("#profile-url-input");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileEditModal = document.querySelector("#profile-edit-modal");
