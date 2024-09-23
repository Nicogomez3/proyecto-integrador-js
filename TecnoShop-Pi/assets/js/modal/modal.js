import { cartAction, disableBtn } from "../cart/cart";

const successModal = document.getElementById('successModal')
const successMessageModal = document.getElementById('successMessage')
const closeSuccessButton = document.getElementById('closeSuccessButton')
const confirmationModal = document.getElementById('confirmationModal');
const confirmationMessage = document.getElementById('confirmationMessage');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');
const btnBuy = document.querySelector('.btn__buy')
const btnDelete = document.querySelector('.btn__delete')

export const openModal = (message, onConfirm) => {
    confirmationMessage.textContent = message;
    confirmationModal.style.display = 'block';
  
    confirmButton.onclick = () => {
      onConfirm();
      closeModal();
    };
  
    cancelButton.onclick = closeModal;
  };
  
const closeModal = () => {
    confirmationModal.style.display = 'none';
};

export const showSuccessModal = (message) => {
    successMessageModal.textContent = message;
    successModal.style.display = 'block';

    closeSuccessButton.onclick = closeSuccessModal;
}

const closeSuccessModal = () => {
        successModal.style.display = 'none';
}

//Funcion para enviar mensaje para borrar/comprar

    

//Funcion para borrar productos del carro
const deleteProducts = () => {
    cartAction('Deseas vaciar el carrito?', 'No hay mas productos en el carro')
 }
 
 const completeBuy = () => {
    cartAction("Deseas completar tu compra?", "Gracias por tu compra")
 }
 

export const initModal = () => {
    btnDelete.addEventListener('click', deleteProducts)
    btnBuy.addEventListener('click', completeBuy)
    disableBtn(btnBuy)
    disableBtn(btnDelete)
}