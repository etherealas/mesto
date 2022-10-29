 const settingsObjects = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__btn-submit_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__span-error_active'
  };

  function enableValidation(settingsObjects) {
    const forms = Array.from(document.querySelectorAll(`${settingsObjects.formSelector}`));
    forms.forEach(form => {
        setEventListener(form, settingsObjects);
    })
  }

  

  function toggleButtonState (inputList, btnElem, settingsObjects) {
    if (hasInvalidInput(inputList)) {
        btnElem.classList.add(`${settingsObjects.inactiveButtonClass}`);
        btnElem.setAttribute('disabled', 'disabled');
    }
    else {
        btnElem.classList.remove(`${settingsObjects.inactiveButtonClass}`);
        btnElem.removeAttribute('disabled', 'disabled');
    }
  }

function setEventListener(form, settingsObjects) {
    const inputList = Array.from(form.querySelectorAll(`${settingsObjects.inputSelector}`));
    const buttonElement = form.querySelector(`${settingsObjects.submitButtonSelector}`)
    toggleButtonState(inputList, buttonElement, settingsObjects);
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            toggleInputErrorState(form, input, settingsObjects);
            toggleButtonState(inputList, buttonElement, settingsObjects);
        })
    })
}

function showInputError(form, input, errorMessage, settingsObjects) {
    input.classList.add(`.${settingsObjects.inputErrorClass}`);
    const errorElem = form.querySelector(`.${input.id}-error`);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(`${settingsObjects.errorClass}`)
}

function hideInputError(form, input, settingsObjects) {
    input.classList.remove(`.${settingsObjects.inputErrorClass}`);
    const errorElem = form.querySelector(`.${input.id}-error`);
    errorElem.classList.remove(`${settingsObjects.errorClass}`);
    errorElem.textContent = '';
}

const toggleInputErrorState = (form, input, settingsObjects) => {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, settingsObjects);
    }
    else {
        hideInputError(form, input, settingsObjects);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some(input => {
        return !input.validity.valid;
    })
}

enableValidation(settingsObjects);