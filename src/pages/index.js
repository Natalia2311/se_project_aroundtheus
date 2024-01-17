// Import all the classes
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import {
  validationSettings,
  profileTitleInput,
  profileDescriptionInput,
  profileEditButton,
  addNewCardButton,
 
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
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
  .then((data) => {
    console.log(data);
    profileUserInfo.setUserInfo({
      name: data.name,
      about: data.about,
    });
    profileUserInfo.setUserAvatar(data.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

function handleCardLike(card) {
  if (!card.isLiked) {
    return api
      .updateLike(card._id)
      .then(() => {
        card.setLikeStatus(true);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    return api
      .removeLike(card._id)
      .then(() => {
        card.setLikeStatus(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

addCardPopup.setEventListeners();
const addFormElement = document.forms["card-form"];
const addFormValidator = new FormValidator(validationSettings, addFormElement);
addFormValidator.enableValidation();

const avatarPopup = new PopupWithForm("#avatar-modal", handleAvatarFormSubmit);
avatarPopup.setEventListeners();

const avatarEditElement = document.forms["avatar-form"];
const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditElement
);
avatarFormValidator.enableValidation();

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
  popupWithImage.open(link, name);
}

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteButton,
    handleCardLike
  );
  return cardElement.getView();
}

const cardDeleteModal = new PopupDeleteConfirm("#delete-modal");
cardDeleteModal.setEventListeners();

function handleDeleteButton(card) {
  cardDeleteModal.open();
  cardDeleteModal.setSubmitAction(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        cardDeleteModal.close();
        card.handleDeleteCard();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function handleProfileEditSubmit({ title, description }) {
  editFormPopup.setLoading(true, "Saving ...");
  api
    .updateUserInfo({ title, description })
    .then((res) => {
      profileUserInfo.setUserInfo(res);
      editFormPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editFormPopup.setLoading(false);
    });
}

function handleAvatarFormSubmit(inputValues) {
  avatarPopup.setLoading(true, "Saving ...");
  api
    .updateAvatar(inputValues.url)
    .then((res) => {
      profileUserInfo.setUserAvatar(inputValues.url);
      avatarPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarPopup.setLoading(false);
    });
}

const openAvatarButton = document.querySelector(".profile__icon");

openAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
});

function handleAddCardFormSubmit(inputValues) {
  addCardPopup.setLoading(true, "Saving ...");
  api
    .getNewCard(inputValues)
    .then((cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.setLoading(false);
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
