main()

// Récupéraion des articles (await = attente que la promesse soit résolue / Uniquement utilisable dans une fonction async)
async function main(){
  const articles = await getArticles()
}

// Appel de l'API 
async function getArticles(){
  return fetch("http://localhost:3000/api/products")
    .then(function(httpBodyResponse){
      return httpBodyResponse.json()
    })
    .then(function(articles){
      displayArticle(articles)
      console.log(articles)
    })
    .catch(function(err){
      alert(err)
    })
}

function displayArticle(articles){
  let items = document.querySelector(".items")
  // boucler sur les articles
  for (let i = 0; i < articles.length; i++) {
    console.log(articles[i])

    //Lien
    let productLink = document.createElement('a'); // 1 : Créer les éléments DOM
    productLink.href = "./product.html?id=" + articles[i]._id // 2 : Remplir les attributs DOM avec les propriétés de mes objets
    items.appendChild(productLink) // 3 : Injecter ce DOM modifié dans le HTML

    //Article
    let productArticle = document.createElement('article');
    productLink.appendChild(productArticle)

    //Image
    let productImage = document.createElement('img');
    productArticle.appendChild(productImage)
    productImage.src = articles[i].imageUrl
    productImage.alt = articles[i].altTxt

    //Nom du canapé
    let productName = document.createElement('h3');
    productArticle.appendChild(productName)
    productName.classList.add('productName')
    productName.innerHTML = articles[i].name

    //Description
    let productDescription = document.createElement('p');
    productArticle.appendChild(productDescription)
    productDescription.classList.add('productDescription')
    productDescription.innerHTML = articles[i].description
  }
}