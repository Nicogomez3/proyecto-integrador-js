const menuLabel = document.querySelector('.menu__label')
const menuNav = document.querySelector('.navbar__menu')
const cartLabel = document.querySelector('.cart__label')
const cartMenu = document.querySelector('.cart') 

export const menuToggle = () => {
    menuNav.classList.toggle('open__menu')
    if(cartMenu.classList.contains('open-cart')){
        cartMenu.classList.remove('open-cart')
        return
    }

}

export const cartToggle = () => {

    cartMenu.classList.toggle('open-cart');
    if (menuNav.classList.contains('open__menu')) {
        menuNav.classList.remove('open__menu');
        return
    }
 
}

//Funcion para cerrar el menu
export const closeOnClick = (e) => {
    if(e.target.classList.contains('navbar__menu')) return;
    menuNav.classList.remove('open__menu')
}

export const initMenu = () => {
    cartLabel.addEventListener('click', cartToggle);    
    menuLabel.addEventListener('click', menuToggle)
    menuNav.addEventListener('click', closeOnClick)
}