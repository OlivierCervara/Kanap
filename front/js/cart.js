const cart = [] //Parce que notre panier est une array

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e)) //Quand on clique sur le boutton on appelle la fonction submitForm.

/**
 * Recupere les elements du panier stockes dans le cache du navigateur et les stocke dans un tableau.
 */
function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length //On recupere ce que l'utilisateur a envoyer dans le localstorage grace a ses orders et on voudra l'afficher dans le panier.
    
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item) //parse nous transforme item en objet. C'est le contraire de stringify.
        cart.push(itemObject)
    }
}

/**
 * Affiche un article dans le panier avec toutes ses informations
 * 
 * @param {Object} item L'objet représentant l'article à afficher
 */
function displayItem(item) {
    const article = makeArticle(item) // Récupère un élément article contenant les informations sur l'article à afficher
    const imageDiv = makeImageDiv(item) // Récupère un élément div contenant l'image de l'article
    article.appendChild(imageDiv) // Ajoute l'élément div contenant l'image à l'élément article
    
    const cardItemContent = makeCartContent(item) // Récupère un élément div contenant les informations de l'article à afficher
    article.appendChild(cardItemContent)
    displayArticle(article)  // Affiche l'article dans le panier
    displayTotalQuantity() // Met à jour le nombre total d'articles dans le panier
    displayTotalPrice() // Met à jour le prix total des articles dans le panier
}

/**
 * Affiche la quantité totale d'articles dans le panier.
 */
function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

/**
 * Affiche le prix total des articles dans le panier.
 * Cette fonction calcule le prix total de tous les articles dans le panier en multipliant le prix de chaque article par sa quantité, et l'affiche dans l'élément HTML identifié par "#totalPrice". 
 * La variable "cart" utilisée dans cette fonction doit contenir un tableau d'objets représentant les articles dans le panier, chacun ayant les propriétés "price" et "quantity".
 */
function displayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
}

/**
 * Fabrique et retourne un élément HTML <div> contenant la description et les paramètres d'un article dans le panier.
 * 
 * @param {Object} item L'objet représentant l'article du panier.
 * @returns {HTMLElement} L'élément HTML <div> contenant la description et les paramètres de l'article.
 */
function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

/**
 * Crée un élément HTML "settings" contenant des boutons pour modifier la quantité et supprimer l'article du panier.
 * 
 * @param {Object} item L'article pour lequel on veut créer les boutons de configuration.
 * @returns {HTMLElement} L'élément HTML "settings" avec les boutons pour modifier la quantité et supprimer l'article du panier.
 */
function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

/**
 * Ajoute un bouton de suppression d'item aux paramètres donnés, avec l'élément associé à supprimer au clic.
 * 
 * @param {HTMLElement} settings Le conteneur des paramètres à modifier.
 * @param {Object} item L'objet représentant l'item à supprimer.
 */
function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item)) //Quand on clique sur l'element cela creer un evenement ou on supprime l'item.

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    
    settings.appendChild(div)
}

/**
 * Supprime un article du panier et met à jour le prix total, la quantité totale, le cache et la page.
 * 
 * @param {Object} item L'article à supprimer.
 */
function deleteItem(item) { //On va lui dire trouve le item dans le panier qui a cette id et supprime le
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color) //Trouve le product tel que le product.id = item.id mais on veut aussi que le product.color = item.color. Il va filtrer sur deux champs differents.
    cart.splice(itemToDelete, 1)  //Supprime l'article correspondant du panier.
    
    // Met à jour le prix total et la quantité totale affichés.
    displayTotalPrice()
    displayTotalQuantity()
    // Supprime les données correspondant à l'article supprimé du cache.
    deleteDataFromCache(item)
    // Supprime l'article de la page.
    deleteArticleFromPage(item) //On veut aussi que le front correspondant disparaisse
}

/**
 * Supprime un article de la page correspondant à l'élément passé en paramètre.
 * La fonction recherche un élément article qui a un attribut data-id correspondant à l'id de l'élément et un attribut data-color correspondant à la couleur de l'élément.
 * L'élément article trouvé est supprimé de la page.
 * 
 * @param {Object} item L'article à supprimer de la page.
 */
function deleteArticleFromPage(item) { //Le probleme c'est qu'encore une fois on veut supprimer le meme article avec le bon id et la bonne couleur.
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`) //On va donc chercher un article avec un data id correspondant a l'item id et qui a egalement un color de item color comme ca on est sur de choper le bon.
    articleToDelete.remove()
}

/**
 * Ajoute le champ de quantité à la section des paramètres de l'article du panier
 * 
 * @param {HTMLElement} settings  L'élément parent dans lequel ajouter le champ de quantité
 * @param {Object} item L'objet représentant l'article du panier
 */
function addQuantityToSettings(settings, item) { 
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")

    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity

    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

/**
 * Met à jour la quantité et le prix total d'un article dans le panier et le local storage.
 * Si la nouvelle quantité est inférieure ou égale à 0 ou supérieure à 100, la quantité est réinitialisée à 0 et une alerte est affichée.
 * 
 * @param {string} id L'ID unique de l'article à mettre à jour.
 * @param {string} newValue La nouvelle valeur de la quantité de l'article.
 * @param {Object} item L'article à mettre à jour.
 */
function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity

    if (item.quantity <= 0 || item.quantity > 100) {
        // Réinitialiser la quantité à 0
        item.quantity = 0;
        alert("La quantité doit être comprise entre 1 et 100.");
        
    } else {
        saveNewDataToCache(item) // Mettre à jour la quantité dans le panier et le local storage
    }

    displayTotalQuantity()
    displayTotalPrice()
    //On lui a enregistrer de nouvelles valeurs mais quand on recharge la page on a un reset.
    //On va donc ecraser la valeur dans le local storage pour la remplacer avec la nouvelle.
    // Le probleme est que nos objets ont le meme id quelque soit la couleur et on voudrait distinguer dans le panier le meme modele de canape maiss en plusieurs couleurs.
    // On pourrait changer le nom de la clef en lui rajoutant une couleur pour distinguer les deux objets. Et donc le meme item avec des couleurs differentes auront des id differents.
    saveNewDataToCache(item)
}

/**
 * Supprime l'élément correspondant à l'objet donné du cache (localStorage) du navigateur.
 * 
 * @param {Object} item L'objet représentant l'élément à supprimer, contenant un ID et une couleur.
 */
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

/**
 * Enregistre les nouvelles données de l'article dans le cache du navigateur.
 * 
 * @param {Object} item L'article à enregistrer.
 */
function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item) // On convertit l'objet en JSON pour pouvoir le stocker dans le localStorage
    const key = `${item.id}-${item.color}` // On crée une clé unique en combinant l'id et la couleur de l'article pour pouvoir le retrouver plus tard
    localStorage.setItem(key, dataToSave) // On enregistre les données dans le cache du navigateur
}

/**
 * Génère la description d'un article à afficher dans le panier.
 * 
 * @param {Object} item L'objet représentant l'article à afficher.
 * @returns {HTMLDivElement} Un élément HTML contenant le nom, la couleur et le prix de l'article.
 */
function makeDescription(item) {
    const description = document.createElement("div") 
    description.classList.add("cart__item__content__description") 

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

/**
 * Ajoute l'article donné en paramètre à la fin de la liste des articles dans le panier.
 * 
 * @param {HTMLElement} article  L'article à ajouter à la liste des articles du panier.
 */
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

/**
 * Crée un nouvel élément HTML <article> qui représente un article de la boutique.
 * 
 * @param {Object} item L'objet qui représente l'article.
 * @returns {HTMLDivElement} L'élément <article> nouvellement créé.
 */
function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

/**
 * Crée une div contenant l'image d'un article de panier.
 * 
 * @param {Object} item L'article pour lequel créer la div.
 * @returns {HTMLDivElement} La div contenant l'image de l'article.
 */
function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

/**
 * Fonction pour soumettre le formulaire de commande.
 * 
 * @param {*} e  L'événement de soumission du formulaire.
 */
function submitForm(e) {
    e.preventDefault()
    
    if (cart.length === 0) {
        alert("Veuillez selectionner des articles a acheter")
        return
    }

    if (isFormInvalid()) return //Si le formulaire est invalide tu vas pas plus loin.
    if (isEmailInvalid()) return

    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            window.location.href = "/html/confirmation.html" + "?orderId=" + orderId
            console.log(data)
        })
        .catch((err) => console.error(err))
}

/**
 * Vérifie si l'adresse email saisie par l'utilisateur est valide.
 * 
 * @returns {boolean} Renvoie true si l'adresse email est invalide, sinon false.
 */
function isEmailInvalid() { //Cela va nous permettre de "verifier" l'email du client.
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/ //C'est une expression reguliere permettant de verifier les caracteres entres par l'utilisateurs afin dans le cas present de voir si il rentre bien un email.
    if (regex.test(email) === false) {
        alert("Veuillez entrer un email valide")
        return true
    }
    return false
}

/**
 * Vérifie si le formulaire est invalide (si un champ est vide).
 * Si le formulaire est invalide, désactive également le bouton de soumission.
 * 
 * @returns {boolean} Renvoie true si le formulaire est invalide, false sinon.
 */
function isFormInvalid() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input") //Il va nous faire une liste de toutes les forms d'inputs
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Veuillez completer toutes les parties du formulaire")
            submitBtn.disabled = true;
            return true
        } //Pour chaque input, si la value est nulle il va nous donner une alerte et il va faire un return pour arreter l'execution de la fonction
        return false
    })
}

//L'api du serveur attend un objet avec une clef contact etc... et il veut une clef qui s'appelle product qui a une array de string et cette array sera des product id.

/**
 * Génère la requête à envoyer au serveur pour passer la commande.
 * @returns {Object} L'objet de la requête, contenant les informations de contact et les ID des produits commandés.
 */
function makeRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
        },
        products: getIdsFromCache()
    }
    return body
}

/**
 * Récupère les IDs des produits ajoutés au panier à partir du cache local.
 * 
 * @returns 
 */
function getIdsFromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}
