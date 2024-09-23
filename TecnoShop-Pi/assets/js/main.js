import { initCart } from "./cart/cart"
import { initMenu } from "./menu/menu";
import { initModal } from "./modal/modal";
import { initProductsSection } from "./products-section/products-section"

//SET DEL CARRITO



const init = () => {
    initProductsSection()
    initCart()
    initMenu()
    initModal()
}

init()



//Modularizar
//Mudar a vite
//agregar animaciones
//Cambiar el hero a un sidebar