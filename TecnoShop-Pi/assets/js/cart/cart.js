import { openModal, showSuccessModal } from "../modal/modal"

let cart = JSON.parse(localStorage.getItem("cart")) || []

const cartContainer = document.querySelector('.cart__container')
const total = document.querySelector('.total')
const successMesssage = document.querySelector('.add--modal')
const bubbleCart = document.querySelector('.cart__bubble')
const btnBuy = document.querySelector('.btn__buy'); // Ajusta el selector según tu HTML
const btnDelete = document.querySelector('.btn__delete'); // Ajusta el selector según tu HTML


const saveCartLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}



//Funcion HTML CART
const createCartProductTemplate = (cartProduct) => {
    const {id, name, prize, img, quantity} = cartProduct;
    return `
     <div class="cart__item">
        <img src=" ${img} " alt="">
        <div class="item__info">
            <h3 class="item__title">${name} </h3>
             <p class="item__bid">En Oferta!</p>
            <span class="item__prize"> ${prize} </span>
        </div>
        <div class="item__handler">
            <span class="quantity__handler down" data-id=${id}>-</span>
            <span class="item__quantity"> ${quantity} </span>
            <span class="quantity__handler up" data-id=${id}>+</span>
        </div>
    </div>
    `
}

//Funcion render
const renderCart = () => {
    if(!cart.length){
        cartContainer.innerHTML = `<p>El carrito está vacio</p>`
        return
    }
    cartContainer.innerHTML = cart.map
    (createCartProductTemplate).join('');
}

//Funcion para obtener el total
const getTotalCart = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.prize) * 
    cur.quantity, 0)
}

//Funcion para mostrar el total
const showTotalCart = () => {
    total.innerHTML = ` $ ${getTotalCart()}`
}

//Funcion burbuja
const renderBubbleCart = () => {
    bubbleCart.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0)
}

//Funcion para habilitar o deshabilitar botones
export const disableBtn = (btn) => {
    if(!cart.length){
        btn.classList.add('disabled');
    } else {
        btn.classList.remove('disabled');
    }
}

export const cartAction = (confirmMsg, successMsg) => {
    if(!cart.length) return
    openModal(confirmMsg, () => {
        resetCart();
        showSuccessModal(successMsg);
      });
    };


//Funcion para actualizar el estado del carro
const updateCartState = () => {
    saveCartLocalStorage()
    showTotalCart()
    renderCart()
    renderBubbleCart()
    disableBtn(btnBuy)
    disableBtn(btnDelete)
}

export const addProduct = (e) => {
    if(!e.target.classList.contains('products__btn')) return
    const product = createProductData(e.target.dataset)
    if(isExistingProduct(product)){
        addUnitToProduct(product)
        showSuccessMessage('Agregaste una nueva unidad')
    } else {
    createCartProduct(product)
    showSuccessMessage('Producto agregado')
    }
    updateCartState()
    console.log(cart)
}


//Funcion para agrergar una unidad al carrito
const addUnitToProduct = (product) => {
    cart = cart.map(cartProduct => 
        cartProduct.id === product.id
        ? {...cartProduct, quantity: cartProduct.quantity + 1}
        : cartProduct
    )
}

//Funcion para crear el objeto del producto
const createCartProduct = (product) => {
   cart = [...cart, {...product, quantity: 1}]
}

//Funcion para validar si un producto existe en el array de carrito
const isExistingProduct = (product) => {
   return cart.find((item) => item.id === product.id);
}

const createProductData = (product) => {
   return {
       id: product.id,
       name: product.name,
       img: product.img,
       prize: product.prize
   }
}

//Funcion para mensaje de compra exitosa
const showSuccessMessage = (msg) => {
   successMesssage.classList.add('active--modal')
   successMesssage.textContent = msg

   setTimeout(() => {
       successMesssage.classList.remove('active--modal')

   }, 3000)
}

//Funcion para manejar el incremento en el carro
const handleIncrement = (id) => {
   const cartProductExisting = cart.find(item => item.id === id)
   addUnitToProduct(cartProductExisting)
};

//Funcion para manejar el decremento del carrito
const handleDecrement = (id) => {
   const cartProductExisting = cart.find((item) => item.id === id);

   if(cartProductExisting.quantity === 1) {
      openModal('Deseas eliminar el producto?', () => {
       removeProduct(cartProductExisting);
      });
       return;
   }

   subtractProductUnit(cartProductExisting)
}

//Funcion para restar unidad al producto

const subtractProductUnit = (cartProductExisting) => {
   cart = cart.map((product) => {
       return product.id === cartProductExisting.id
       ? {...product, quantity: Number(product.quantity) - 1}
       : product;
   });
};

//Funcion para borrar el producto del carro
const removeProduct = (cartProductExisting) => {
   cart = cart.filter(product => product.id !== cartProductExisting.id)
   updateCartState()
}

//Funcion para manejar la cantidad en el carro
const handleQuantity = (e) => {
   if(e.target.classList.contains('up')) {
       handleIncrement(e.target.dataset.id)
   } else if(e.target.classList.contains('down')){
       handleDecrement(e.target.dataset.id)
   }

   updateCartState()
};

//Funcion para vaciar el carro
const resetCart = () => {
   cart = []
   updateCartState()
}








export const initCart = () => {
    document.addEventListener('DOMContentLoaded', renderCart)
    document.addEventListener('DOMContentLoaded', showTotalCart)
   
    cartContainer.addEventListener('click', handleQuantity)


    renderBubbleCart(cart)

}