// Import all the classes
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  addCardModal,
  profileEditModal,
  cardListEl,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  profileEditButton,
  addNewCardButton,
  previewImageEl,
  previewHeadingEl,
  cardTitleInput,
  cardUrlInput,
  previewCardModal,
  previewModalContainer,
  profileTitle,
  profileDescription,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";

// Create instances of the classes

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

addCardPopup.setEventListeners();
const addFormElement = document.forms["card-form"];
const addFormValidator = new FormValidator(validationSettings, addFormElement);
addFormValidator.enableValidation();

const editFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editFormPopup.setEventListeners();
const profileEditElement = document.forms["profile-form"];
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditElement
);
editFormValidator.enableValidation();

const profileUserInfo = new UserInfo(
  ".profile__title",
  ".profile__description"
);

const popupWithImage = new PopupWithImage("#preview-card-modal");
popupWithImage.setEventListeners();

// All the rest


function handleImageClick(link, name) {
  previewImageEl.src = link;
  previewImageEl.alt = name;
  previewHeadingEl.textContent = name;
  popupWithImage.open(link, name);
}

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
}

function handleProfileEditSubmit(inputValues) {
  profileUserInfo.setUserInfo(inputValues.title, inputValues.description);
  editFormPopup.close();
}

function handleAddCardFormSubmit(inputValues) {
  const cardData = createCard({
    name: inputValues.title,
    link: inputValues.url,
  });
  cardSection.addItem(cardData);
  addCardPopup.close();
}

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const userInfo = profileUserInfo.getUserInfo();
  profileTitleInput.value = userInfo.title;
  profileDescriptionInput.value = userInfo.description;
  editFormPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addFormValidator.resetValidation();
});
