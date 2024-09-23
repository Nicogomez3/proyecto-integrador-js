export const productsData = [
    {
        "id": 1,
        "name": "Samsung Galaxy S24",
        "prize": "1500000",
        "user": "Juan Perez",
        "category": "celular",
        "cardImg": "/img/products/s24 copia.png"
    },
    {
        "id": 2,
        "name": "iPhone 13 Pro",
        "prize": "950000",
        "user": "Maria Lopez",
        "category": "celular",
        "cardImg": "/img/products/iphone13black copia.png"
    },
    {
        "id": 3,
        "name": "Motorola Edge 40",
        "prize": "900000",
        "user": "Carlos Gonzalez",
        "category": "celular",
        "cardImg": "/img/products/edge40 copia.png"
    },
    {
        "id": 4,
        "name": "Xiaomi Redmi 13C",
        "prize": "500000",
        "user": "Andrea Rojas",
        "category": "celular",
        "cardImg": "/img/products/xiaomi copia.png"
       
    },
    {
        "id": 5,
        "name": "Motorola Moto G24",
        "prize": "400000",
        "user": "Rosa Castro",
        "category": "celular",
        "cardImg": "/img/products/g24 copia.png"
    },

    {
        "id": 6,
        "name": "Samsung 65\" QLED 4K Smart TV",
        "prize": "299999",
        "user": "Luis Fernandez",
        "category": "monitores y tv",
        "cardImg": "/img/products/samsung-qled-65.png"
    },
    {
        "id": 7,
        "name": "Samsung 32\" Curved Monitor",
        "prize": "64999",
        "user": "Daniel Herrera",
        "category": "monitores y tv",
        "cardImg": "/img/products/samsung-curved-32 copia.png"
    },
    {
        "id": 8,
        "name": "LG OLED 55\" Smart TV",
        "prize": "299999",
        "user": "Patricia Ortiz",
        "category": "monitores y tv",
        "cardImg": "/img/products/lg-oled-55 copia.png"
    },
    {
        "id": 9,
        "name": "Hyundai 50\" 4K Smart TV",
        "prize": "89999",
        "user": "Marta Alvarez",
        "category": "monitores y tv",
        "cardImg": "/img/products/hyundai-50-4k copia.png"
    },
    {
        "id": 10,
        "name": "TCL 55P615 55\" 4K UHD Smart TV",
        "prize": "129999",
        "user": "Ana Martinez",
        "category": "monitores y tv",
        "cardImg": "/img/products/tvtcl55.png"
    },
    {
        "id": 11,
        "name": "Whirlpool Refrigerator",
        "prize": "359999",
        "user": "Laura Garcia",
        "category": "electrodomésticos",
        "cardImg": "/img/products/whirlpool-wrb322.png"
    },
    {
        "id": 12,
        "name": "LG Inverter Air Conditioner",
        "prize": "249999",
        "user": "Jorge Sanchez",
        "category": "electrodomésticos",
        "cardImg": "/img/products/lg-air.conditioner.png"
    },
    {
        "id": 13,
        "name": "Philips Air Fryer",
        "prize": "24999",
        "user": "Roberto Diaz",
        "category": "electrodomésticos",
        "cardImg": "/img/products/philips-air-fryer.png"
      
    },
    {
        "id": 14,
        "name": "Whirlpool Microwave Oven",
        "prize": "19999",
        "user": "Veronica Mendez",
        "category": "electrodomésticos",
        "cardImg": "/img/products/whirlpool-microwave.png"
    },
    
    {
        "id": 15,
        "name": "Samsung Washing Machine",
        "prize": "129999",
        "user": "Ricardo Morales",
        "category": "electrodomésticos",
        "cardImg": "/img/products/samsung wash.png"
        
    },
    {
        "id": 16,
        "name": "Samsung Galaxy Buds Pro",
        "prize": "69999",
        "user": "Sofia Ruiz",
        "category": "auriculares",
        "cardImg": "/img/products/samsung-galaxy-buds-pro copia.png"
    },

    {
        "id": 17,
        "name": "Samsung Galaxy Buds Pro2",
        "prize": "69999",
        "user": "Sofia Ruiz",
        "category": "auriculares",
        "cardImg": "/img/products/samsung-buds-pro2.png"
    },
    {
        "id": 18,
        "name": "Apple AirPods Pro",
        "prize": "89999",
        "user": "Hernan Gomez",
        "category": "auriculares",
        "cardImg": "/img/products/apple-airpods-pro copia.png"
    },
    {
        "id": 19,
        "name": "JBL Tune 225TWS Earbuds",
        "prize": "29999",
        "user": "Diego Ramirez",
        "category": "auriculares",
        "cardImg": "/img/products/JBL_TUNE-225TWS.png"
    },
    {
        "id": 20,
        "name": "Sony WH-1000XM4 Headphones",
        "prize": "99999",
        "user": "Lucia Torres",
        "category": "auriculares",
        "cardImg": "/img/products/sonywh1000x.png"
    }
]



 const divideProductsInParts = (size) => {
     let productsList = []
  
     for(let i = 0; i < productsData.length; i += size){
       productsList.push(productsData.slice(i, i + size))
     }
  
     return productsList
   }
  
    //console.log(divideProductsInParts(6))
  
   // MAGIC STRINGS
   const PRODUCTS_SIZE = 5

export const appState = {
     products: divideProductsInParts(PRODUCTS_SIZE),
     currentProductsIndex: 0,
     productsLimit: divideProductsInParts(PRODUCTS_SIZE).length,
     activeFilter: null,
}