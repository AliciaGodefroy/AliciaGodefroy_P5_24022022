// Récupération des articles qui sont dans le localStorage
let cart = localStorage.getItem("cart");
console.log('cart', cart)

let cartItem = JSON.parse(cart);

//---------- Affichage des articles du panier ----------

// Sélection de la class où j'injecte le code HTML
const cart__items = document.getElementById("cart__items");
console.log(cart__items);

function displayCart(){
  // Si le panier est vide, afficher : Le panier est vide
  if(cart == null){
    console.log('panier vide')
  }else{
  
  // Si le panier n'est pas vide, afficher les articles
  for (let k=0; k < cartItem.length; k++){
    console.log(cartItem.length);
    cart__items.innerHTML += 
    `<article class="cart__item" data-id="${cartItem[k].info._id}" data-color="${cartItem[k].colors}">
        <div class="cart__item__img">
          <img src="${cartItem[k].info.imageUrl}" alt="${cartItem[k].info.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${cartItem[k].info.name}</h2>
            <p>${cartItem[k].selectedVariant}</p>
            <p>${cartItem[k].info.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :${cartItem[k].quantity} </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
  }
}
  
// Appel de la fonction pour afficher le panier
displayCart()

// Stockage des éléments à l'intérieur de tableaux
let deleteItemContainer = [...document.getElementsByClassName('deleteItem')]
let quantityContainer = [...document.getElementsByClassName('itemQuantity')]

//---------- Suppression d'un produit du panier ----------

deleteItemContainer.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Dans le DOM
    let pickArticle = deleteItemContainer[index].closest('.cart__item')
    pickArticle.remove()
    // Dans le local storage
    cartItem.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cartItem))
  })
})

//---------- Modification de la quantité d'un produit ----------
quantityContainer.forEach((cart__items, index) => {
  cart__items.addEventListener('change', () => { 
// Au click, modifie l'objet sur le LocalStorage et le dom
      cartItem[index].quantity = quantityContainer[index].value
      console.log('index', index)
      console.log('quantityContainer', quantityContainer[index].value)
      console.log('cartItem Index', cartItem[index])
      localStorage.setItem("cart", JSON.stringify(cartItem))
  })
})

//---------- Affichage du prix total et de la quantité totale ----------

let cartItemTotal = 0
let priceTotal = 0
let totalQuantityDOM = document.getElementById('totalQuantity')
let totalPriceDOM = document.getElementById('totalPrice')

if (cartItem !== null) {
  for (let j = 0; j < cartItem.length; j++) {
    let quantityLoop = parseInt(cartItem[j].quantity)
    let priceLoop = parseInt(cartItem[j].info.price)
    cartItemTotal += quantityLoop
    priceTotal += priceLoop * quantityLoop
  }
}

if (totalQuantity && totalPrice) {
  totalQuantityDOM.innerHTML = cartItemTotal
  totalPriceDOM.innerHTML = priceTotal 
}


//---------- Gestion du formulaire ----------

// Variables  du formulaire Contact
let color2 = '#cfe9fa';
// Mise en place RegEx les plus larges possibles pour éviter les erreurs de caratéres 
let RegEx1 = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
let RegEx2 = /^[a-zA-Z\-1-9]+$/;

// Formulaire Contact
  
  //--- Vérification Prénom

  // Déclaration des variables 
  let firstName = document.getElementById('firstName')
  let errorFirstName = document.getElementById('firstNameErrorMsg')
  let regexName = /^[a-z ,.'-]+$/i;

  // Évenement Input pour indiquer s'il y a une erreur
  firstName.addEventListener('input',(e)=>{
    e.preventDefault();
    if (regexName.test(firstName.value)==false) {
        errorFirstName.innerHTML = "Veuillez renseigner un prénom valide (les chiffres ne sont pas tolérés).";
        errorFirstName.style.color = color2;
    }else{
        errorFirstName.innerHTML = "";
    }
  });
  
        
  //--- Vérification Nom

  // Déclaration des variables
  let lastName = document.getElementById('lastName')
  let errorLastName = document.getElementById('lastNameErrorMsg')

  // Évenement Input pour indiquer s'il y a une erreur
  lastName.addEventListener('input',(e)=>{
    e.preventDefault();
    if (regexName.test(lastName.value)==false) {
        errorLastName.innerHTML = "Veuillez renseigner un nom valide (les chiffres ne sont pas tolérés).";
        errorLastName.style.color = color2;
    }else{
        errorLastName.innerHTML = "";
      }
  });
  
        
  //--- Vérification Addresse

  // Déclaration des variables
  let address = document.getElementById('address')
  let errorAddress = document.getElementById('addressErrorMsg')
  let regexAdress = /^[a-zA-Z0-9\s,'-]*$/

  // Évenement Input pour indiquer s'il y a une erreur
  address.addEventListener('input', (e)=>{
    e.preventDefault();
    if(regexAdress.test(address.value)== false){
      errorAddress.innerHTML="Veuillez renseigner une adresse valide. Exemple : 23 rue des Écouffes, 75001 Paris";
      errorAddress.style.color = color2;
    }else{
      errorAddress.innerHTML = "";
    }
  })


  //--- Vérification Ville

  // Déclaration des variables
  let city = document.getElementById('city')
  let errorCity = document.getElementById('cityErrorMsg')
  let regexCity = /^[a-z ,.'-]+$/i

  // Évenement Input pour indiquer s'il y a une erreur
  city.addEventListener('input', (e)=>{
    e.preventDefault();
    if(regexCity.test(city.value)== false){
      errorCity.innerHTML="Veuillez renseigner une ville valide.";
      errorCity.style.color = color2;
    }else{
      errorCity.innerHTML = "";
    }
  })
 
  //--- Vérification Email

  // Déclaration des variables
  let email = document.getElementById('email')
  let errorEmail = document.getElementById('emailErrorMsg')
  let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Évenement Input pour indiquer s'il y a une erreur
  email.addEventListener('input',(e)=>{
    e.preventDefault();
    if (regexEmail.test(email.value)==false) {
        errorEmail.innerHTML = "Veuillez renseigner une adresse valide. Exemple : juliedupont@gmail.com";
        errorEmail.style.color = color2;
    }else{
        errorEmail.innerHTML = "";
    }
  });


  //---------- Envoi de la commande vers l'API ----------

  let order = document.getElementById('order'); 

  // Click du bouton 'COMMANDER'
  order.addEventListener('click',(e)=>{
  e.preventDefault();
    
  // Création d'un object Contact pour récupérer les données de l'utilisateur
    let contact = {
      firstName : firstName.value,
      lastName : lastName.value,
      address : address.value,
      city : city.value,
      email : email.value,
    }
    
    // Si l'utilisateur n'a pas rempli certaines données :
    if (firstName.value === ""|| lastName.value === ""|| address.value === "" || city.value === "" || email.value === "") {
        window.confirm("Merci de renseigner tous les champs du formulaire")
        // La page ne s'actualise pas
        window.onbeforeunload;
    }  else if (regexEmail.test(email.value)==false || regexCity.test(city.value)== false || regexAdress.test(address.value)== false || regexName.test(lastName.value)==false || regexName.test(firstName.value)==false){
        window.confirm("Merci de renseigner correctement tous les champs du formulaire")
        // La page ne s'actualise pas
        window.onbeforeunload;
      }
      else{ // Sinon, on créé un tableau qui envoie les données à l'API  
        
        let products = [];

        // On boucle pour récupérer les id et les injecter dans le tableau 'products'
        cartItem.forEach(item => {
        products.push(item.info._id)
        });

        let clientOrder = {contact , products};

        // On envoie notre requête à l'API avec la méthode POST
        fetch(('http://localhost:3000/api/products/order'),{
            method: "POST",
            headers :{'Accept':'application/json','Content-type':'application/json'
            },
            body : JSON.stringify(clientOrder)
        })
        .then(res =>{
            return res.json();
        })
        .then((data)=>{
        window.location.href =`confirmation.html?orderId=${data.orderId}`;
        console.log('order id', data.orderId)
        })
        .catch((error)=>{
            alert(error);
        })
    }
  })
