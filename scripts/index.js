const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.elements');
const profilePopup = content.querySelector('.popup_profile');
const popupOverlay = document.querySelector('.popup');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupBtnClose = profilePopup.querySelector('.popup__btn-close');
const profilePopupInputName = profilePopup.querySelector('.popup__input');
const profilePopupInputOccupation = profilePopup.querySelector('.popup__input_type_occupation');
const cardsPopup = content.querySelector('.popup_cards');
const cardsPopupBtnClose = cardsPopup.querySelector('.popup__btn-close');
const btnSubmit = cardsPopup.querySelector('.popup__btn-submit');
const cardsPopupInput = cardsPopup.querySelector('.popup__input');
const cardsPopupInputOccupation = cardsPopup.querySelector('.popup__input_type_occupation');
const cardsPopupForm = cardsPopup.querySelector('.popup__form');
const profile = content.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileOccupation = profile.querySelector('.profile__occupation');
const editButton = profile.querySelector('.profile__edit-button');
const cardsButton = profile.querySelector('.profile__add-button');
const elementTemplate = document.querySelector('.template');
const imagePopup = document.querySelector('.popup_image');
const imagePopupImg = imagePopup.querySelector('.zoom__img');
const imagePopupFigcaption = imagePopup.querySelector('.zoom__figcaption'); 
const imagePopupBtnClose = imagePopup.querySelector('.popup__btn-close');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    const currentItem = creatCard(item.name, item.link);
    cardsContainer.append(currentItem);
  });
  
};

const creatCard = (name, link) => {
  const currentItem = elementTemplate.content.cloneNode(true);
  const currentText = currentItem.querySelector('.element__text');
  const currentLink = currentItem.querySelector('.element__img');


  currentText.textContent = name;
  currentLink.src = link;
  currentLink.alt = name;

  const likeBtn = currentItem.querySelector('.element__btn-heart');
  likeBtn.addEventListener('click', handlLikeCard);

  const deleteBtn = currentItem.querySelector('.element__trashcan');
  deleteBtn.addEventListener('click', handleDeleteItem);


  currentLink.addEventListener('click', function(){
    imagePopupFigcaption.textContent = name;
    imagePopupImg.src = link;
    imagePopupImg.alt = name;
    openPopup(imagePopup);
  });

  return currentItem;
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}


function openProfilePopup() {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputOccupation.value = profileOccupation.textContent;
  openPopup(profilePopup);
}


function openPopupCards() {
  openPopup(cardsPopup);
}


function closePopup(popup) {
  popup.classList.toggle('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}


function handleSubmitFormProfile (evt) {
    evt.preventDefault();
    profileName.textContent = profilePopupInputName.value;
    profileOccupation.textContent = profilePopupInputOccupation.value;
    closePopup(profilePopup);
}


const handleAddCard =(evt) => {
  evt.preventDefault(); 
  const card = creatCard(cardsPopupInput.value, cardsPopupInputOccupation.value);
  cardsContainer.prepend(card);
  cardsPopupForm.reset();
  closePopup(cardsPopup);
  resetForm(cardsPopupForm, btnSubmit, settingsObjects)
}

const resetForm = (cards, btn, settings) => {
  const inputs = Array.from(cards.querySelectorAll(`${settings.inputSelector}`));
  toggleButtonState(inputs, btn, settings);
}

const handlLikeCard = (e) => {
  e.target.classList.toggle('element__btn-heart_active');
}


const handleDeleteItem = (e) => {
  const currentEl = e.target.closest('.element');
  currentEl.remove();
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}


const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

renderInitialCards();


editButton.addEventListener('click', openProfilePopup);
profilePopupForm.addEventListener('submit', handleSubmitFormProfile);
cardsButton.addEventListener('click', openPopupCards);
cardsPopupForm.addEventListener('submit', handleAddCard);
profilePopupBtnClose.addEventListener('click', () => closePopup(profilePopup));
cardsPopupBtnClose.addEventListener('click', () => closePopup(cardsPopup));
imagePopupBtnClose.addEventListener("click", () => closePopup(imagePopup));
content.addEventListener('mousedown', closePopupOverlay);
