

const productsContainer = document.querySelector('.products__container')
const productsNewContainer = document.querySelector('.products__new__section')
const productsCategories = document.querySelector('.products__categories')
const category = document.querySelectorAll('.category')
const cartLabel = document.querySelector('.cart__label')
const cartMenu = document.querySelector('.cart') 
const cartContainer = document.querySelector('.cart__container')
const menuLabel = document.querySelector('.menu__label')
const menuNav = document.querySelector('.navbar__menu')
const total = document.querySelector('.total')
const bubbleCart = document.querySelector('.cart__bubble')
const successMesssage = document.querySelector('.add--modal')
const btnBuy = document.querySelector('.btn__buy')
const btnDelete = document.querySelector('.btn__delete')
const modalCart = document.getElementById('modalCart')
//SET DEL CARRITO

let cart = JSON.parse(localStorage.getItem("cart")) || []

const saveCartLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

const createProductsNewTemplate = (product) => {
    const{name, cardImg, category} = product
    return `
         <div class="products__new__cards">
                    <img src="${cardImg}" alt="">
                    <h3> ${name} </h3>
                    <div class="products__description">
                        <p class="gray__text"> ${category} </p>
                    </div>
                </div>    
    `
}

const renderNewProducts = (products) => {
    productsNewContainer.innerHTML = products.map(createProductsNewTemplate).join("");
}

  const createProductTemplate = (product) => {


      const{id, name, prize, category, cardImg} = product
      return `
     <div class="products__cards">
     <img src=" ${cardImg} " alt="">
          
          <div class="products__description">
              <div class="products__description__name"> 
                <h3> ${name} </h3>
              </div>
              <div class="products__description__info">
                <p class="gray__text"> ${category} </p>
                <span class="products__prize"> $${prize}  </span>  
              </div>
                   
          </div>
          <button class="products__btn"
           data-id='${id}'
            data-name='${name}'
            data-prize='${prize}'
            data-img='${cardImg}'
          >Añadir</button>

      </div> 
      `
  }



const renderProducts = (products) => {
    productsContainer.innerHTML += products.map(createProductTemplate).join("");
     
}

const isInactiveFilter = (element) => {
    return element.classList.contains('category') && !element.classList.contains('active')
}

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...category];
    categories.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return
        }
        categoryBtn.classList.add("active");
    })
}

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category
    changeBtnActiveState(appState.activeFilter);
    console.log(appState)
}

const applyFilter = (e) => {
    if(!isInactiveFilter(e.target)) return
    changeFilterState(e.target)
    productsContainer.innerHTML = "";
    if(appState.activeFilter){
        const filteredProducts = productsData.filter(
            product => product.category === appState.activeFilter
        )
        renderProducts(filteredProducts)
        appState.currentProductsIndex = 0;
        return
        console.log(filteredProducts)
    }
    renderProducts(appState.products[0])
}

// const viewMoreProducts = () => {
//     appState.currentProductsIndex += 1
//     let { products, currentProductsIndex, productsLimit } = appState;
//     renderProducts(products[currentProductsIndex]);
//     if (currentProductsIndex === productsLimit - 1) {
//         viewMore.classList.add("hidden");
//       }
// }

//Logica menu

const menuToggle = () => {
    menuNav.classList.toggle('open__menu')
    if(cartMenu.classList.contains('open-cart')){
        cartMenu.classList.remove('open-cart')
        return
    }

}

//Funcion para mostrar u ocultar el carro

const cartToggle = () => {

    cartMenu.classList.toggle('open-cart');
    if (menuNav.classList.contains('open__menu')) {
        menuNav.classList.remove('open__menu');
        return
    }
 
}

//Funcion para cerrar el menu
const closeOnClick = (e) => {
    if(!e.target.classList.contains('navbar__menu')) return;
    menuNav.classList.remove('open__menu')
}


//=========================
//Logica del carrito
//========================

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
const disableBtn = (btn) => {
    if(!cart.length){
        btn.classList.add('disabled');
    } else {
        btn.classList.remove('disabled');
    }
}

//Funcion para actualizar el estado del carro
const updateCartState = () => {
    saveCartLocalStorage()
    showTotalCart()
    renderCart()
    renderBubbleCart()
    disableBtn(btnBuy)
    disableBtn(btnDelete)
}

const addProduct = (e) => {
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
        if(window.confirm('Deseas eliminar el producto?')){
            removeProduct(cartProductExisting)
        }
        return
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


//Funcion para enviar mensaje para borrar/comprar
const cartAction = (confirmMsg, successMsg) => {
    if(!cart.length) return
    if(window.confirm(confirmMsg)) {
        resetCart()
        alert(successMsg)
    }
}


//Funcion para borrar productos del carro
const deleteProducts = () => {
    cartAction('deseas vaciar el carrito?', 'No hay mas productos en el carro')
}

const completeBuy = () => {
    cartAction("Deseas completar tu compra?", "Gracias por tu compra")
}

const init = () => {
    
    renderProducts(appState.products[0])
    renderNewProducts(appState.products[0])
    productsCategories.addEventListener('click', applyFilter)
    // viewMore.addEventListener('click', viewMoreProducts);
    cartLabel.addEventListener('click', cartToggle);
    menuLabel.addEventListener('click', menuToggle)
    menuNav.addEventListener('click', closeOnClick)
    
    //cart
    document.addEventListener('DOMContentLoaded', renderCart)
    document.addEventListener('DOMContentLoaded', showTotalCart)
    productsContainer.addEventListener('click', addProduct)
    cartContainer.addEventListener('click', handleQuantity)
    btnDelete.addEventListener('click', deleteProducts)
    btnBuy.addEventListener('click', completeBuy)
    renderBubbleCart(cart)
    disableBtn(btnBuy)
    disableBtn(btnDelete)
}

init()

//41:06