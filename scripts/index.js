const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.elements');
const formElement = content.querySelector('.popup__container');
const profilePopup = content.querySelector('.popup_profile');
const buttonCloseProfile = profilePopup.querySelector('.popup__btn-close');
const formPopup = profilePopup.querySelector('.popup__container_profile');
const formCard = content.querySelector('.popup__container_cards');
const cardsPopup = content.querySelector('.popup_cards');
const buttonCloseCard = cardsPopup.querySelector('.popup__btn-close');
const inputNameCard = cardsPopup.querySelector('.popup__input');
const inputLinkCard = cardsPopup.querySelector('.popup__input_type_occupation');
const popupFormCards = cardsPopup.querySelector('.popup__form_edit');
const nameInput = profilePopup.querySelector('.popup__input');
const jobInput = profilePopup.querySelector('.popup__input_type_occupation');
const profile = content.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const occupationProfile = profile.querySelector('.profile__occupation');
const editButton = content.querySelector('.profile__edit-button');
const cardsButton = content.querySelector('.profile__add-button');
const elementTemplate = document.querySelector('.template');
const popupZoom = document.querySelector('.popup__image');
const popupZoomImg= popupZoom.querySelector('.zoom__img');
const popupZoomFigcaption = popupZoom.querySelector('.zoom__figcaption'); 
const buttonZoomClose = popupZoom.querySelector('.popup__btn-close');


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

const render = () => {
  initialCards.forEach((item) => {
    const currentItem = currentItemNode(item.name, item.link);
    cardsContainer.append(currentItem);
  });
  
};

const currentItemNode = (name, link) => {
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

  popupFormCards.addEventListener('submit', handleAddCard);

  currentLink.addEventListener('click', function(){
    popupZoomFigcaption.textContent = name;
    popupZoomImg.src = link;
    popupZoomImg.alt = name;
    openPopup(popupZoom);
  });

  return currentItem;
}



function openPopup(popup) {
  popup.classList.toggle('popup_opened');
}


function editPopup() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
  openPopup(profilePopup);
}


function addCards() {
  openPopup(cardsPopup);
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = jobInput.value;
    closePopup(profilePopup);
}


const handleAddCard =(evt) => {
  evt.preventDefault(); 
  const card = currentItemNode(inputNameCard.value, inputLinkCard.value);
  cardsContainer.prepend(card);
  inputNameCard.value = '';
  inputLinkCard.value = '';
  closePopup(cardsPopup);
}


const handlLikeCard = (e) => {
  e.target.classList.toggle('element__btn-heart_active');
}


const handleDeleteItem = (e) => {
  const currentEl = e.target.closest('.element');
  currentEl.remove();
}


render();


editButton.addEventListener('click', editPopup);
formElement.addEventListener('submit', formSubmitHandler);
cardsButton.addEventListener('click', addCards);
buttonCloseProfile.addEventListener('click', () => closePopup(profilePopup));
buttonCloseCard.addEventListener('click', () => closePopup(cardsPopup));
buttonZoomClose.addEventListener("click", () => closePopup(popupZoom));


