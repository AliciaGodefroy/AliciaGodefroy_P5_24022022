//-------------------- OPTION 1 -----------------------------
// Mise en place du Local Storage

function savePanier(panier){
    localStorage.setItem("panier", JSON.stringify(panier)); //JSON.stringify permet de transformer l'objet en chaine de caractères
  }
  
  function getPanier(){
    let panier = localStorage.getItem("panier");
    if(panier == null){
      return [ ];
    }else{
      return JSON.parse(panier); // JSON.parse permet de retranformer la chaine de caractère en objet
    }
  }
  
  // Création de l'ajout au panier
  
  function addPanier(item){
    let panier = getPanier();
    let foundItem = panier.find(p => p.id == item.id); //Gestion des quantités (ajout d'un item si le produit existe déjà)
    if(foundItem != undefined){
      foundItem.quantity++;
    }else {
      item.quantity = 1;
      panier.push(item); // On considère le panier comme un tableau, et on push l'item dans le tableau
    }
    savePanier(panier);
  }
  
  // Retirer un item du panier
  
  function removeFromPanier(item){
    let panier = getPanier();
    panier = panier.filter(p => p.id != item.id);
    savePanier(panier);
  }
  
  // Changer la quantitée (est-ce que c'est nécessaire?)
  
  function changeQuantity(item,quantity){
    let panier = getPanier();
    let foundItem = panier.find(p => p.id == item.id);
    if(foundItem != undefined){
      foundItem.quantity += quantity;
      if(foundItem.quantity <= 0){
        removeFromPanier(foundItem);
      }
    }
    savePanier(panier);
  } //ne fonctionne pas ?
  
  // Nombre d'article dans le panier
  
  function getNumberItem(){
    let panier = getPanier();
    let number =  0;
    for(let item of panier){
      number += item.quantity;
    }
    return number;
  }
  
  // Prix total du panier
  function getTotalPrice(){
    let panier = getPanier();
    let total =  0;
    for(let item of panier){
      total += item.quantity * item.price;
    }
    return total;
  }

/*
//--------------------------- OPTION 2 -----------------------

//------GESTION DU PANIER
// Récupération des données sélectionnées par l'utilisateur et envoi au panier

//Sélection de du bouton Ajouter au panier
const envoyerPanier = document.getElementById("addToCart")

//addEventListener - Pour écouter le bouton et envoyer le panier
envoyerPanier.addEventListener ("click", (event)=> {
  event.preventDefault();

  //--- Récupérer les valeurs du produit choisi
  let optionsProduct = {

  }
})*/