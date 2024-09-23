import { addProduct } from "../cart/cart.js"
import { appState, productsData } from "../data.js"

const productsContainer = document.querySelector('.products__container')
const productsNewContainer = document.querySelector('.products__new__section')
const productsCategories = document.querySelector('.products__categories')
const category = document.querySelectorAll('.category')

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


export const initProductsSection = () => {
    renderProducts(appState.products[0])
    renderNewProducts(appState.products[0])
    productsContainer.addEventListener('click', addProduct)
    productsCategories.addEventListener('click', applyFilter)
}