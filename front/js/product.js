// Récupérer les paramètres de l'URL
let url = new URL(document.location)
console.log(url)

// Récupérer l'ID
let id = url.searchParams.get("id")
console.log(id)

// Appel de l'API 
fetch('http://localhost:3000/api/products/'+id)
  .then(function(httpBodyResponse){
    return httpBodyResponse.json()
    .then(product =>{
      // Créer les éléments DOM

        //Image
        let productImage = document.createElement("img");
        document.querySelector(".item__img").appendChild(productImage);
        productImage.src = product.imageUrl
        productImage.alt= product.altTxt

        //Title
        let productName = document.getElementById("title").innerHTML = product.name
        /*document.querySelector(".item__content__titlePrice").appendChild(productName);
        productName.classList.add('productName')
        productName.innerHTML = product.name */

        //Prix
        let productPrice = document.getElementById("price").innerHTML = product.price
        /*document.querySelector(".item__content__titlePrice").appendChild(productPrice);
        productPrice.classList.add('productPrice')
        productPrice.innerHTML = product.price*/
        
        //Description
        let productDesc = document.getElementById("description").innerHTML = product.description

        //Couleur
        let colors = document.getElementById("colors");
        
    })
  })
  .catch(function(err){
    alert(err)
  })

//Afficher les options de couleurs
for (let i = 0; i < colors.length; i++) {
  console.log(colors)
  
}
  
