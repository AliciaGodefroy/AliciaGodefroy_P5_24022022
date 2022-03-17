// Récupérer les paramètres de l'URL
let url = new URL(document.location)
console.log(url)

// Récupérer l'ID
let id = url.searchParams.get("id")
console.log(id)

var globalProduct = {}

// Appel de l'API 
fetch('http://localhost:3000/api/products/'+id)
  .then(function(httpBodyResponse){
    return httpBodyResponse.json()
  })
  .then(function(product){
    globalProduct = product
    displayProduct(product)
  })
  .catch(function(err){
    alert(err)
  })

function displayProduct(product){
  // Créer les éléments DOM
  console.log(product.colors)

    //Image
    let productImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImage);
    productImage.src = product.imageUrl
    productImage.alt= product.altTxt

    //Title
    let productName = document.getElementById("title")
    productName.innerHTML = product.name 

    //Prix
    let productPrice = document.getElementById("price")
    productPrice.innerHTML = product.price
        
    //Description
    let productDesc = document.getElementById("description")
    productDesc.innerHTML = product.description

    //Couleur
    let selectColor = document.getElementById("colors")
    for (let i = 0; i < product.colors.length; i++) {
      let selectOption = document.createElement("option")
      selectOption.innerText = product.colors[i]
      selectOption.value = product.colors[i]
      selectColor.appendChild(selectOption)
    }
}

/*import { addPanier } from '../js/panier.js';*/


//-------------------- MISE EN PLACE DU LOCAL STORAGE ---------------------

function savePanier(panier){
  localStorage.setItem("panier", JSON.stringify(panier)); //JSON.stringify permet de transformer l'objet en chaine de caractères
}

function getPanier(){
  let panier = localStorage.getItem("panier");
  console.log('panier', panier)
  if(panier == null){
    return [ ];
  }else{
    return JSON.parse(panier); // JSON.parse permet de retranformer la chaine de caractère en objet
  }
}

// Création de l'ajout au panier

function addPanier(){
  let objectCart = {}
  let panier = getPanier();
  let foundProduct = panier.find(p => p.id == objectCart.id&& p.selectedVariant == objectCart.selectedVariant); //Gestion des quantités (ajout d'un item si le produit existe déjà)
  if(foundProduct != undefined){
     foundProduct.quantity++;
  }else {
    objectCart.info = globalProduct
    objectCart.quantity = document.getElementById("quantity").value
    objectCart.selectedVariant = document.getElementById("colors").value

    panier.push(objectCart); // On considère le panier comme un tableau, et on push l'item dans le tableau
  }
  savePanier(panier);
}

// // Éviter les doublons dans le panier
// function productVerif (panier, objectCart){
//   const object = panier.find(element => element.id === objectCart.id&& element.selectedVariant === objectCart.selectedVariant);
//   if(object){
//     const n = parseInt(object.quantity);
//     const m = parseInt(objectCart.quantity);
//     object.quantity = (n+ m).toString();
//   }else{
//     panier.push(objectCart);
//   }
// }

// Retirer un item du panier

// function removeFromPanier(){
//   let panier = getPanier();
//   panier = panier.filter(p => p.id != objectCart.id);
//   savePanier(panier);
// }

// Changer la quantitée (est-ce que c'est nécessaire?)

// function changeQuantity(item,quantity){
//   let panier = getPanier();
//   let foundItem = panier.find(p => p.id == item.id);
//   if(foundItem != undefined){
//     foundItem.quantity += quantity;
//     if(foundItem.quantity <= 0){
//       removeFromPanier(foundItem);
//     }
//   }
//   savePanier(panier);
// } //ne fonctionne pas ?

// Nombre d'article dans le panier

// function getNumberItem(){
//   let panier = getPanier();
//   let number =  0;
//   for(let item of panier){
//     number += item.quantity;
//   }
//   return number;
// }

// // Prix total du panier
// function getTotalPrice(){
//   let panier = getPanier();
//   let total =  0;
//   for(let item of panier){
//     total += item.quantity * item.price;
//   }
//   return total;
// }


//-------------------- FIN ---------------------


// Mise en place du bouton "Ajouter au panier"
let addToCart = document.getElementById("addToCart")
// Enregistrer le bouton
addToCart.addEventListener("click",addPanier)


