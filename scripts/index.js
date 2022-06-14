const content = document.querySelector('.content');
const popup = content.querySelector('.popup');
const formElement = popup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input');
const jobInput = formElement.querySelector('.popup__input_type_occupation');
const closeButton = popup.querySelector('.popup__btn-close');
const profile = content.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const occupationProfile = profile.querySelector('.profile__occupation');
const editButton = content.querySelector('.profile__edit-button');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);  