function showInputError(formEl, inputEl, {inputErrorClass, errorClass} ) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`); 
    inputEl.classList.add(inputErrorClass); 
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }
   
  function hideInputError(formEl, inputEl, {inputErrorClass, errorClass} ) {
      const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`); 
      inputEl.classList.remove(inputErrorClass); 
      errorMessageEl.textContent = "";
      errorMessageEl.classList.remove(errorClass);
    }

  function checkInputValidity(formEl, inputEl, options) {
    if(!inputEl.validity.valid) {
     showInputError(formEl, inputEl, options);
    } else
    hideInputError(formEl, inputEl, options);   
}

function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
}


function enableButton(inputEls, submitButton, inactiveButtonClass) {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    
        }
function disableButton(inputEls, submitButton, inactiveButtonClass) {
    
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;  
        return; 
    }

function toggleButtonState (inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disableButton(inputEls, submitButton, inactiveButtonClass);
  } else {
    enableButton(inputEls, submitButton, inactiveButtonClass);
  }   
}

function setEventListeners(formEl, options) {
    const { inputSelector, submitButtonSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);
    toggleButtonState(inputEls, submitButton, options);
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
         
           checkInputValidity(formEl, inputEl, options);
           toggleButtonState(inputEls, submitButton, options);
        }) 
    })
}
       

  
// Adding Handlers to all forms

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
            formEl.addEventListener("submit", (e) => {
                e.preventDefault();
            });
        setEventListeners(formEl, options);
    });
}



const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__form-input_type_error",
    errorClass: "modal__error_visible",  
};

enableValidation(config);





  