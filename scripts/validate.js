 const listObjects = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__btn-submit_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__span-error_active'
  });

  function enableValidation(listObjects) {
    const forms = Array.from(document.querySelectorAll(`${listObjects.formSelector}`));
    forms.forEach(form => {
        form.addEventListener('submit', (evt => {
            evt.preventDefault();
        }))
        setEventListener(form, listObjects);
    })
  }

  

  function toggleButtonState (inputList, btnElem, listObjects) {
    if (hasInvalidInput(inputList)) {
        btnElem.classList.add(`${listObjects.inactiveButtonClass}`);
        btnElem.setAttribute('disabled', 'disabled');
    }
    else {
        btnElem.classList.remove(`${listObjects.inactiveButtonClass}`);
        btnElem.removeAttribute('disabled', 'disabled');
    }
  }

function setEventListener(form, listObjects) {
    const inputList = Array.from(form.querySelectorAll(`${listObjects.inputSelector}`));
    const buttonElement = form.querySelector(`${listObjects.submitButtonSelector}`)
    toggleButtonState(inputList, buttonElement, listObjects);
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            isValid(form, input);
            toggleButtonState(inputList, buttonElement, listObjects);
        })
    })
}

function showInputError(form, input, errorMessage, listObjects) {
    input.classList.add(`${listObjects.inputErrorClass}`);
    const errorElem = form.querySelector(`.${input.id}-error`);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(`${listObjects.errorClass}`)
}

function hideInputError(form, input, listObjects) {
    input.classList.remove(`${listObjects.inputErrorClass}`);
    const errorElem = form.querySelector(`.${input.id}-error`);
    errorElem.classList.remove(`${listObjects.errorClass}`);
    errorElem.textContent = '';
}

const isValid = (form, input) => {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, listObjects);
    }
    else {
        hideInputError(form, input, listObjects);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some(input => {
        return !input.validity.valid;
    })
}

enableValidation(listObjects);