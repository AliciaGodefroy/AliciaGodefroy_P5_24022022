// Récupérer le lien dans la barre d'adresse
let url = new URL(window.location.href); 

// Récupérer l'orderId dans l'URL 
let orderId = url.searchParams.get("orderId"); 

// Afficher le numéro de commande sur la page
let confirmOrderId = document.getElementById('orderId');
confirmOrderId.innerHTML = orderId; 

// Vider le localStorage
localStorage.clear()