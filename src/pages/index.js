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
  deleteCardModal,
  editProfileAvatarModal
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/api.js";
import PopupDeleteConfirm from "../components/PopupDeleteConfirm.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "260f3e4b-e160-43cd-8335-e153b3805f81",
    "Content-Type": "application/json",
  },
});

let cardSection;

api
  .getInitialCards()
  .then((res) => {
    cardSection = new Section(
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
    console.log(err);
  });

api
  .getUserInfo()
  .then(({ name, about }) => {
    profileUserInfo.setUserInfo({
      name,
      about,
    });
  })
  .catch((err) => {
    console.error(err);
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
  ".profile__description",
  ".profile__image"
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
  const cardElement = new Card(cardData, "#card-template", handleImageClick, handleDeleteButton);
  return cardElement.getView();
}

const cardDeleteModal = new PopupDeleteConfirm("#delete-modal");
cardDeleteModal.setEventListeners();

function handleDeleteButton(card) {
  cardDeleteModal.open();
  cardDeleteModal.setEventListeners();
  cardDeleteModal.setSubmitAction(() => {
    api.
    deleteCard(card._id)
    .then(() => {
      
      cardDeleteModal.close();
      card.handleDeleteCard();
      
    })
    console.log(id)
    .catch((err) => {
      console.error(err);
    });
  });

}


function handleProfileEditSubmit({ title, description }) {
  // editFormPopup.setLoading(true, "Saving ...");
  api.
    updateUserInfo({ title, description }).then((res) => {
    profileUserInfo.setUserInfo(res);
  });
  editFormPopup.close();
}

function handleAvatarFormSubmit(inputValues) {
  api
    .updateAvatar(inputValues.url)
    .then((res) => {
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
  api.getNewCard(inputValues).then((res) => cardSection.addItem(cardData));
  addCardPopup.close().catch((err) => {
    console.log(err);
  });
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
