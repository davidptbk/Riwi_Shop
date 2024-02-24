//icons
const icon = document.querySelector("#account-js");
const iconShop = document.querySelector("#shopping-js");
const iconFavorite = document.querySelector("#favorite-js");

//modals
const accountModal = document.querySelector(".account")
const ModalContent = document.querySelector(".carrito");
//const ModalContentFavorite = document.querySelector(".liked");
const modal = document.querySelector('.carrito');
const modalFavorite = document.querySelector('.liked');
//boxesRf
const efect = document.querySelector(".efect");
const body = document.querySelector(".efect");
//events
body.addEventListener('click',()=>{
  CerrarModalshopCarr();
  CerrarModalFavorite();
  cerrarAccount();
})
iconFavorite.addEventListener("click", () => {
   if (modalFavorite.style.display === "flex") {
    efect.style.filter = 'blur(0px)';
     modalFavorite.style.display = "none";
   } else {
    CerrarModalshopCarr();
    cerrarAccount()
    modalFavorite.style.display = "flex";
    efect.style.filter = 'blur(2px)';
   
  }
 })

iconShop.addEventListener('click', () => {
  if (modal.style.display === "flex") {
    efect.style.filter = 'blur(0px)';
    modal.style.display = "none";
  } else {
    cerrarAccount()
    modal.style.display = "flex";
     CerrarModalFavorite();
     efect.style.filter = 'blur(2px)';
  }
})

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    cerrarAccount()
    CerrarModalshopCarr()
     CerrarModalFavorite()
  }
})

icon.addEventListener('click', () => {
  if (accountModal.style.display === "flex") {
    efect.style.filter = 'blur(0px)';
    accountModal.style.display = "none";
  } else {
    CerrarModalshopCarr()
     CerrarModalFavorite()
    accountModal.style.display = "flex";
    efect.style.filter = 'blur(2px)';
  }
})

//fuctions



function cerrarAccount() {
  accountModal.style.display = "none";
  efect.style.filter = 'blur(0px)';
}

export function CerrarModalshopCarr() {
  modal.style.display = "none";
  efect.style.filter = 'blur(0px)';
}

 export function CerrarModalFavorite() {
  modalFavorite.style.display = "none";
  efect.style.filter = 'blur(0px)';
 }
