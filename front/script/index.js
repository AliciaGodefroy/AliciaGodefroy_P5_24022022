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
  //console.log(articles)
  for (let i = 0; i < articles.length; i++) {
    console.log(articles[i])
    // créer les éléments DOM
    let articleLink = document.createElement('a');
    // remplir les attributs DOM avec les propriétés de mes objets 
    articleLink.href = "./product.html?id=" + articles[i]._id
    articleLink.innerHTML = "test"
    // injecter ce DOM modifié dans le HTML
    items.appendChild(articleLink)
  }
  
  // document.getElementById("items").innerHTML += '<a href="./product.html?id=42"><article><img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"><h3 class="productName">${article.name}</h3><p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>'
}