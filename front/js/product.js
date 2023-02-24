// Ici nous voulons rechercher les parametres d'URL afin d'acceder a ce qu contient les differentes id de nos kanap
const queryString = window.location.search //Ce qui nous permet de prendre l'entierete de l'URL de la page product dont on va ectraire les params
const urlParams = new URLSearchParams(queryString) //On extrait les params en lui passant window.location.search en argu cad l'URL entiere du product.
const id = urlParams.get("id") //On peut finalement extraire le product id venant des params de notre URL.
if (id != null) {
    let itemPrice = 0 //let car si on avait mit const on aurait pas pu le reassigner.
    let imgUrl, altText, articleName
}

// Maintenant qu'on a l'id on va faire une requete au serveur pour avoir un peu plus d'informations
fetch(`http://localhost:3000/api/products/${id}`) //Ce qui nous permet d'extraire les donnees de l'id a l'interieur de product
    .then((response) => response.json())
    .then((res) => handleData(res))

// Maintenant qu'on a recupere les donnees nous allons les afficher de la meme maniere que dans le script.js

/**
 *Prend les données d'un produit kanap et met à jour l'interface utilisateur.
 *
 *  @param {Object} kanap
 */
function handleData(kanap) {
    // Récupère les propriétés 
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    // Met à jour les variables globales pour être utilisées dans d'autres fonctions
    itemPrice = price //On prend le prix depuis l'API pour le coller a la variable itemPrice ligne6
    imgUrl = imageUrl
    altText = altTxt
    articleName = name

    // Met à jour l'interface utilisateur
    makeImage(altTxt, imageUrl)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

/**
 * Crée un élément image avec un texte alternatif et une URL d'image, puis devient enfant de l'element parent.
 *
 * @param {string} altTxt Le texte alternatif à utiliser pour l'image.
 * @param {string} imageUrl L'URL de l'image à utiliser.
 */
function makeImage(altTxt, imageUrl) {
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

/**
 * Met à jour le texte d'un élément de titre spécifié avec le nom de l'élément.
 *
 * @param {string} name Le nom de l'élément à utiliser dans le texte du titre.
 */
function makeTitle(name) {
    const h1 = document.querySelector("#title") 
    h1.textContent = name //Le texte contenu dans le h1 renvoit le nom de l'item
}

/**
 *Met à jour le texte d'un élément de prix spécifié avec le prix de l'élément.
 *
 * @param {string} price  Le prix de l'élément à utiliser dans le texte du prix.
 */
function makePrice(price) {
    const span = document.querySelector("#price")
    span.textContent = price
}

/**
 *Met à jour le texte d'un élément de description spécifié avec la description de l'élément.
 *
 * @param {string} description La description de l'élément à utiliser dans le texte de la description.
 */
function makeDescription(description) {
    const p = document.querySelector("#description")
    p.textContent = description
}

/**
 *Crée une liste déroulante d'éléments de couleur spécifiés, puis l'ajoute à un élément parent spécifié.
 *
 * @param {Array} colors Un tableau d'éléments de couleur à ajouter à la liste déroulante.
 */
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

/**
 *Cette fonction lit les valeurs de la couleur et de la quantité sélectionnées par l'utilisateur à partir du formulaire, puis vérifie si elles sont valides en appelant la fonction isOrderInvalid(). 
 *Si les valeurs ne sont pas valides, la fonction s'arrête. 
 *Sinon, elle appelle la fonction saveOrder() pour sauvegarder la commande dans le stockage local et la redirige vers la page du panier en appelant la fonction redirectToCart().
 */
function handleClick() { //La fonction va lire le color et le quantity depuis le formulaire.
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
        
    if (isOrderInvalid(color, quantity)) return //Si y'en a un des deux quiest invalic, la fonction s'arrete
    saveOrder(color, quantity) //sinon il va sauvegarder toute les donnees qu'on veut
    redirectToCart() //et enfin il va nous rediriger vers le cart.
}

/**
 *Enregistre une commande dans le stockage local avec les informations spécifiées.
 *
 * @param {string} color La couleur de l'élément commandé.
 * @param {number} quantity La quantité de l'élément commandé.
 */
function saveOrder(color, quantity) {
    const key = `${id}-${color}`
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity), //Par defaut la console nous renvoit un quantity en string, il est preferable que ce soit un number.
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    localStorage.setItem(key, JSON.stringify(data)) //localStorage ne peut pas enregistrer des objets, on doit les transformer en string.
    //L'id est remplacee par key afin de distinguer 2 items avec des coloris differents (voir cart.js)
}

/**
 *Détermine si une commande est invalide en fonction de la couleur et de la quantité spécifiées.
 *
 * @param {string} color La couleur de l'élément commandé.
 * @param {number} quantity La quantité de l'élément commandé.
 * @return {boolean} True si la commande est invalide, false sinon.
 */
function isOrderInvalid(color, quantity) { //"Est ce que le choix de produit est invalide ?" et la fonction renvoit true si une seule des conditions est remplie.
    if (color == null || color === "" || quantity == null || quantity <= 0 || quantity >= 100) {
        alert("Veuillez selectionner un nombre d'article compris entre 1 et 100 ainsi qu'une couleur.")
        return true //On veut que la fonction arrete de s'executer quand les conditions sont remplies.
    }
}

/**
 *Redirige l'utilisateur vers la page du panier.
 */
function redirectToCart() {
    window.location.href = "cart.html" //Pour nous rediriger vers notre page panier grace a son URL.
}

// L'objectif est de mettre nos donnees de commande dans notre base de donnee locale qui est le localStorage pour pouvoir les recuperer ensuite dans notre page panier.