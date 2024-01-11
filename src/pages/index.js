// Import all the classes
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import {
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
  initialCards,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "260f3e4b-e160-43cd-8335-e153b3805f81",
    "Content-Type": "application/json",
  },
}); 
 


// Create instances of the classes
let cardSection;
api.
getInitialCards()
.then((res) => {
const cardSection = new Section(
  {
    items: res,
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);
  cardSection.renderItems();
})
.catch((err) => {
  console.error(err);
});



api
.getUserInfo()
.then((inputValues) => {
  profileUserInfo.setUserInfo(inputValues.title, inputValues.description);
})
.catch((err) => {
  console.log(err);
});






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
api
.updateUserInfo(inputValues.title, inputValues.description).then((res) => {
  profileUserInfo.setUserInfo(res);
});
  editFormPopup.close();
}

function handleAvatarFormSubmit(inputValues) {
  api.updateAvatar(inputValues.avatar)
  .then((inputValues) => {
    profileUserInfo.setUserAvatar(inputValues);
    updateAvatarForm.close();
  })
  .catch((err) => {
    console.log(err);
  });
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
