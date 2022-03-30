// Récupération des articles qui sont dans le localStorage
let panier = localStorage.getItem("panier");
console.log('panier', panier)

let objPanier = JSON.parse(panier);

//---------- Affichage des articles du panier ----------

// Sélection de la class où j'injecte le code HTML
const cart__items = document.getElementById("cart__items");
console.log(cart__items);

// Si le panier est vide, afficher : Le panier est vide
if(panier == null){
  console.log('panier vide')
}else{
  
  // Si le panier n'est pas vide, afficher les articles
  for (let k=0; k < objPanier.length; k++){
     console.log(objPanier.length);
    // console.log(objPanier[k]);
    cart__items.innerHTML += 
    `<article class="cart__item" data-id="${objPanier[k].info._id}" data-color="${objPanier[k].colors}">
        <div class="cart__item__img">
          <img src="${objPanier[k].info.imageUrl}" alt="${objPanier[k].info.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${objPanier[k].info.name}</h2>
            <p>${objPanier[k].info.colors}</p>
            <p>${objPanier[k].info.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :${objPanier[k].quantity} </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
  }
}

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
    objPanier.splice(index, 1)
    localStorage.setItem("panier", JSON.stringify(objPanier))
    location.reload()
  })
})

//---------- Modification de la quantité d'un produit ----------
// !!! problème !!!
quantityContainer.forEach((cart__items, index) => {
  cart__items.addEventListener('change', () => { 
// Au click, modifie l'objet sur le LocalStorage et le dom
      objPanier[index].quantity = quantityContainer[index].value
      localStorage.setItem("panier", JSON.stringify(objPanier))
      location.reload()
  })
})

//---------- Affichage du prix total et de la quantité totale ----------

let totObjPanier = 0
let totPrice = 0
let totalQuantity = document.getElementById('totalQuantity')
let totalPrice = document.getElementById('totalPrice')

if (objPanier !== null) {
  for (let j = 0; j < objPanier.length; j++) {
    let quantityLoop = parseInt(objPanier[j].quantity)
    let priceLoop = parseInt(objPanier[j].price)
    totObjPanier += quantityLoop
    totPrice += priceLoop * quantityLoop
  }
}

if (totalQuantity && totalPrice) {
  totalQuantity.innerHTML = totObjPanier
  totalPrice.innerHTML = totPrice //!!! affiche NaN au lieu du prix total 
}


//---------- Gestion du formulaire ----------

// Variables  du formulaire Contact
let color2 = '#cfe9fa';
// Mise en place RegEx les plus larges possibles pour éviter les erreurs de caratéres 
let RegEx1 = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
let RegEx2 = /^[a-zA-Z\-1-9]+$/;

// Formulaire Contact
addEventListener('change', () => {
  
  //Vérification Prénom
  function validFirstName() {
    let firstName = document.getElementById('firstName').value
    let text = document.getElementById('firstNameErrorMsg')
  // Prise en compte les Regex
    let pattern = RegEx1;
    let number = RegEx2;

    if (firstName.match(pattern)) {
      return firstName
    } else  if (firstName.match(number)) {
              text.innerHTML = 'Les chiffres ne sont pas tolérés.'
              text.style.color = color2;
      } else {
              text.innerHTML = 'Veuillez renseigner un prénom valide.'
              text.style.color = color2;
      }
  }
        
  // Vérification Nom
  function validLastName() {
    let lastName = document.getElementById('lastName').value
    let text = document.getElementById('lastNameErrorMsg')
    let pattern = RegEx1;
    let number = RegEx2;

    if (lastName.match(pattern)) {
      return lastName
    } else if (lastName.match(number)) {
        text.innerHTML = 'Les chiffres ne sont pas tolérés.'
        text.style.color = color2;
      } else {
        text.innerHTML = 'Veuillez renseigner un nom valide.'
        text.style.color = color2;
      }
  }
        
  //Vérification Addresse
  function validAddress() {
    let address = document.getElementById('address').value
    let text = document.getElementById('addressErrorMsg')
    let pattern = '([0-9a-zA-Z,. ]*) ?([0-9]{5}) ?([a-zA-Z]*)'

    if (address.match(pattern)) {
      return address
    } else {
      text.innerHTML =
        'Veuillez renseigner une adresse valide. Exemple : 23 rue des Écouffes, 75001 Paris'
      text.style.color = color2;
    }
  }
  // Vérification Ville
  function validCity() {
    let city = document.getElementById('city').value
    let text = document.getElementById('cityErrorMsg')
    let pattern = /^[a-z ,.'-]+$/i

    if (city.match(pattern)) {
      return city
    } else {
      text.innerHTML = 'Veuillez renseigner une ville valide'
      text.style.color = color2;
    }
 }
  //Vérification Email
  function validEmail() {
    let mail = document.getElementById('email').value
    let text = document.getElementById('emailErrorMsg')
    let pattern = new RegExp(
      '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
      'g'
    )

    if (mail.match(pattern)) {
      return mail
    } else {
      text.innerHTML = 'Veuillez renseigner une adresse valide. Exemple : juliedupont@gmail.com'
      text.style.color = color2;
    }
  }

  // Appels des fonctions pour les alertes sur le DOM
  validFirstName()
  validLastName()
  validAddress()
  validCity()
  validEmail()

  //---------- Envoi de la commande vers l'API ----------

  let order = document.getElementById('order'); 

  // Click du bouton 'COMMANDER'
  order.addEventListener('click',(e)=>{
    e.preventDefault();
    // Création d'un object Contact pour récupérer les données de l'utilisateur
    let contact = {
        firstName : validFirstName(),
        lastName : validLastName(),
        address : validAddress(),
        city : validCity(),
        email : validEmail(),
    }
    // Si l'utilisateur n'a pas rempli certaines données :
    if (validFirstName() === ""|| validLastName() === ""|| validAddress() === "" || validCity() === "" || validEmail() === "") {
        window.confirm("Merci de renseigner tous les champs du formulaire")
        // La page ne s'actualise pas
        window.onbeforeunload;
    // Sinon, on créé un tableau qui envoie les données à l'API    
    }else{
        
        let products = [];

        // On boucle pour récupérer les id et les injecter dans le tableau 'products'
        objPanier.forEach(order => {
        products.push(order.id)
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
        })
        .catch((error)=>{
            alert(error);
        })
    }
  })
})
