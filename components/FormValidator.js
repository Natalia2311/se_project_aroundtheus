class FormValidator {
    constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._submitButton = document.querySelector(this._submitButtonSelector);
    //this._submitButton = this._form.querySelector(this.settings.submitButtonSelector);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
    }

    disableButton() {
      this._submitButton.classList.add(inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
      } 

   _showInputError(inputEl) {
        const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`); 
        inputEl.classList.add(this._inputErrorClass); 
        errorMessageEl.textContent = inputEl.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
      }
       
    _hideInputError(inputEl) {
          const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`); 
          inputEl.classList.remove(this._inputErrorClass); 
          errorMessageEl.textContent = "";
          errorMessageEl.classList.remove(this._errorClass);
        }
    
     _enableButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;  
      }


    _disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;  
    return; 
     }        

    _toggleButtonState (inputEls) {
        if (this._hasInvalidInput(inputEls)) {
          this._disableButton(inputEls, this._submitButton, this._inactiveButtonClass);
        } else {
          this._enableButton(inputEls, this._submitButton, this._inactiveButtonClass);
        }   
      }

      _hasInvalidInput(inputList) {
        return !inputList.every((inputEl) => inputEl.validity.valid);
    }

    _checkInputValidity(formEl, inputEl, options) {
        if(!inputEl.validity.valid) {
        this._showInputError(formEl, inputEl, options);
        } else
        this._hideInputError(formEl, inputEl, options);   
    }
    

    _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(this._inputEls, this._submitButton);
    this._inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
         
           this._checkInputValidity(this._form, inputEl);
           this._toggleButtonState(inputEls, this._submitButton);
        });
    });
    }

    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    this._setEventListeners();

    } 
}


const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__form-input_type_error",
    errorClass: "modal__error_visible",      
}




export default FormValidator;