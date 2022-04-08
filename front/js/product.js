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

//-------------------- MISE EN PLACE DU LOCAL STORAGE ---------------------

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart)); //JSON.stringify permet de transformer l'objet en chaine de caractères
}

function getCart(){
  let cart = localStorage.getItem("cart");
  console.log('cart', cart)
  if(cart == null){
    return [ ];
  }else{
    return JSON.parse(cart); // JSON.parse permet de retranformer la chaine de caractère en objet
  }
}

//---------- Création de l'ajout au panier 

function addtoCart(){
  let error = 0
  var objectCart = {}
  let cart = getCart();
  objectCart.info = globalProduct
  objectCart.quantity = document.getElementById("quantity").value
  objectCart.selectedVariant = document.getElementById("colors").value
  // On vérifie si le produit est déjà existant dans le panier
  let foundProduct = cart.find(p => p.id == objectCart._id&& p.selectedVariant == objectCart.selectedVariant);
  console.log( typeof objectCart.selectedVariant)
  console.log('objectCart.selectedVariant', objectCart.selectedVariant)
  // Si le produit est différent d'une valeur non définie (et donc égal à un produit dans le panier)
  if(foundProduct != undefined){
    // On incrémente la quantité en plus
    const n = parseInt(foundProduct.quantity);
    const m = parseInt(objectCart.quantity);
    foundProduct.quantity = (n+m).toString();
  } else {
    if (objectCart.quantity < 1){
      error = 1;
      window.confirm("Merci de choisir une quantité supérieure à 0.")
      // La page ne s'actualise pas
      window.onbeforeunload;
    } 
    if (objectCart.selectedVariant === ""){
      error = 2;
      window.confirm("Merci de choisir une couleur.")
      // La page ne s'actualise pas
      window.onbeforeunload;
    } 
    if (error === 0) {
      console.log('ajout panier')
      cart.push(objectCart); // On considère le panier comme un tableau, et on push l'item dans le tableau
    }
  }
  saveCart(cart);
}

//---------- Mise en place du bouton "Ajouter au panier" ---------- 

let addToCartDOM = document.getElementById("addToCart")
// Enregistrer le bouton
addToCartDOM.addEventListener("click",addtoCart)


