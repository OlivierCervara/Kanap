// Ici nous voulons rechercher les parametres d'URL afin d'acceder a ce qu contient les differentes id de nos kanap
const queryString = window.location.search //Ce qui nous permet de prendre l'entierete de l'URL de la page product dont on va ectraire les params
const urlParams = new URLSearchParams(queryString) //On extrait les params en lui passant window.location.search en argu cad l'URL entiere du product.
const productId = urlParams.get("id") //On peut finalement extraire le product id venant des params de notre URL.
if (id != null) {
    let itemPrice = 0 //let car si on avait mit const on aurait pas pu le reassigner.
    let imgUrl, altText
}

// Maintenant qu'on a l'id on va faire une requete au serveur pour avoir un peu plus d'informations
fetch(`http://localhost:3000/api/products/${id}`) //Ce qui nous permet d'extraire les donnees de l'id a l'interieur de product
    .then((response) => response.json())
    .then((res) => handleData(res))

// Maintenant qu'on a recupere les donnees nous allons les afficher de la meme maniere que dans le script.js
function handleData(kanap) {
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    itemPrice = price //On prend le prix depuis l'API pour le coller a la variable itemPrice ligne6
    imgUrl = imageUrl
    altText = altTxt
    makeImage(altTxt, imageUrl)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

// On fabrique l'element image
function makeImage(altTxt, imageUrl) {
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item_img")
    parent.appendChild(image)
}

// On fabrique l'element title
function makeTitle(name) {
    const h1 = document.querySelector("#title") 
    h1.textContent = name //Le texte contenu dans le h1 renvoit le nom de l'item
}

// On fabrique l'element prix
function makePrice(price) {
    const span = document.querySelector("#price")
    span.textContent = price
}

// On fabrique l'element description
function makeDescription(description) {
    const p = document.querySelector("#description")
    p.textContent = description
}

// On fabrique l'element couleur avec la selection via le select
function makeColors(colors) {
    const select = document.querySelector("#colors")
    colors.forEach((color) => { //On veut que pour chaque couleur :
        const option = document.createElement("option") //On fabrique une option
        option.value = color //La valeur des options c'est les couleurs
        option.textContent = color //On veut que le texte soit la dite couleur
        select.appendChild(option) //On veut que les options de couleurs soient des enfants de l'element select
    })
}

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick) 

function handleClick() { //La fonction va lire le color et le quantity depuis le formulaire.
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
        
    if (isOrderInvalid(color, quantity)) return //Si y'en a un des deux quiest invalic, la fonction s'arrete
    saveOrder(color, quantity) //sinon il va sauvegarder toute les donnees qu'on veut
    redirectToCart() //et enfin il va nous rediriger vers le cart.
}

function saveOrder(color, quantity) {
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity), //Par defaut la console nous renvoit un quantity en string, il est preferable que ce soit un number.
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText
    }
    localStorage.setItem(id, JSON.stringify(data)) //localStorage ne peut pas enregistrer des objets, on doit les transformer en string.
}

function isOrderInvalid(color, quantity) { //"Est ce que le choix de produit est invalide ?" et la fonction renvoit true si une seule des conditions est remplie.
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Veuillez selectionner un nombre d'article ainsi qu'une couleur.")
        return true //On veut que la fonction arrete de s'executer quand les conditions sont remplies.
    }
}

function redirectToCart() {
    window.location.href = "cart.html" //Pour nous rediriger vers notre page panier grace a son URL.
}
// L'objectif est de mettre nos donnees de commande dans notre base de donnee locale qui est le localStorage pour pouvoir les recuperer ensuite dans notre page panier.