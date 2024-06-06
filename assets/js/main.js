const productsContainer = document.querySelector('.products__container')
const productsCategories = document.querySelector('.products__categories')
const category = document.querySelectorAll('.category')


const createProductTemplate = (product) => {


    const{id, name, prize, user, category, cardImg} = product
    return `
    <div class="products__cards">
    <img src=" ${cardImg} " alt="">
         <h3> ${name} </h3>
         <div class="products__description">
             <p class="gray__text"> ${category} </p>
             <span class="products__prize"> ${prize}  </span>
             
         </div>
         <button class="products__btn">Añadir</button>

     </div> 
     <div class="products__cards2">
         <img src="${cardImg}" alt="">
         <h3> ${name}  </h3>
         <div class="products__description">
             <p class="gray__text"> ${category}</p>
             <span class="products__prize">${prize}</span>
             
         </div>
         <button class="products__btn">Añadir</button>

     </div>
     <div class="products__cards3">
         <img src="${cardImg}" alt="">
         <h3> ${name} </h3>
         <div class="products__description">
             <p class="gray__text">${category}</p>
             <span class="products__prize">${prize}</span>
             
         </div>
         <button class="products__btn">Añadir</button>

     </div>
     <div class="products__cards4">
         <img src="${cardImg}" alt="">
         <h3>${name}</h3>
         <div class="products__description">
             <p class="gray__text">${category}</p>
             <span class="products__prize">${prize}</span>
             
         </div>
         <button class="products__btn">Añadir</button>

     </div>
     <div class="products__cards5">
         <img src="${cardImg}" alt="">
         <h3>${name}</h3>
         <div class="products__description">
             <p class="gray__text">${category}</p>
             <span class="products__prize">${prize}</span>
             
         </div>
         <button class="products__btn">Añadir</button>

     </div>
    `
}


const renderProducts = (products) => {
    productsContainer.innerHTML = products.map(createProductTemplate).join("");
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


const init = () => {
    
    renderProducts(productsData)
    productsCategories.addEventListener('click', applyFilter)
}

init()