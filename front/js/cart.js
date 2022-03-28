// Récupération des articles qui sont dans le localStorage
let panier = localStorage.getItem("panier");
console.log('panier', panier)

let objPanier = JSON.parse(panier);

//---------- Affichage des articles du panier

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

//------------ Suppression d'un article -------

// Suppression de l'article dans le LocalStorage
function deleteItemSelect(index){
  let items = objPanier;
  items.splice(index, 1);
  localStorage.setItem('anyItem', JSON.stringify(items));
  if (items.lenght === 0) {
    localStorage.removeItem('anyItem');
  }
  //updateNumberArticles();
}

// Bouton "Supprimer"
const deleteItem = document.querySelectorAll(".deleteItem")
deleteItem.forEach((btn, i) => {
  btn.addEventListener('click', e => {
    deleteItemSelect(i);
  });
});









