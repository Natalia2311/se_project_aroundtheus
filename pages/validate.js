

function showInputError(formEl, inputEl, { errorClass } ) {
    const errorMessageEl = formEl.querySelector('#${inputEl.id}-error'); 
    const  inputErrorClass = options.inputErrorClass;
    inputEl.classList.add(inputErrorClass); 
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }
 
  function hideInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector('#${inputEl.id}-error'); 
    const errorClass = options.errorClass;
    const inputErrorClass = options.inputErrorClass;
    inputEl.classList.remove(inputErrorClass); 
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  function checkInputValidity(formEl, inputEl) {
    if(!inputEl.validity.valid) {
     showInputError(formEl, inputEl, inputEl.validationMessage);
    } else
        hideInputError(formEl, inputEl);   
}

function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableButton(inputEls, submitButton, inactiveButtonClass) {
    if (hasInvalidInput(inputEls)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;  
        return; 
    }
    
    }

function enableButton(inputEls, submitButton, inactiveButtonClass) {
if (!hasInvalidInput([...inputEls])) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}
    }
    
function toggleButtonState (inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disableButton(inputEls, submitButton, inactiveButtonClass);
    return;
  }   
  enableButton(inputEls, submitButton, inactiveButtonClass);
}

function setEventListeners(formEl, options) {
    const { inputSelector } = options;
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
    const formEls = [...document.querySelectorAll(options, formSelector)];
    formEls.forEach((formEl) => {
            formEl.addEventListener("submit", (e) => {
                e.preventDefault();
            });
        setEventListeners(formEl, options);
    });
}


function enableValidation(options) {
    console.log(options);
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
