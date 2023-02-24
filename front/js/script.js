// On envoi une requete pour recuperer les donnees qu'on veut afficher dans notre site web
fetch("http://localhost:3000/api/products") 
    .then((res) => res.json()) 
    .then((data) => addProduct(data)) //On veut que les donnees recup soient directement transferees a la fonction addProduct.
    .catch((error) => console.error(error)) //Gestion des erreurs link front et back, route qui change.. serveur eteint, fetch rate.

/**
 * addProduct va utiliser un forEach afin de parcourir toutes les donnees de nos produits et pour pouvoir les afficher sur la page d'accueil.
 * Pour chaque produit, on va creer tous les elements necessaires et qui devront apparaitre grace au create element.
 * Les elements sont ajoutes les uns aux autres grace a la fonction appendChildren et appendElementsToArticle.
 * @param {Array} kanap un tableau d'objets représentant les produits à afficher sur la page d'accueil.
 */
function addProduct(kanap) {
    kanap.forEach((kanap) => {
        
    let { _id, imageUrl, altTxt, name, description } = kanap

    let anchor = makeAnchor(_id) 
    let article = document.createElement("article") 
    let image = makeImage(imageUrl, altTxt)
    let h3 = makeH3(name)
    let p = makeParagraph(description)

    appendChildren(anchor, article) 
    appendElementsToArticle(article, image, h3, p) 
    })
}

/**
 *makeAnchor creer un element d'ancrage et defini son url en ajoutant un parametre d'id pour chaque produit.
 *Ce parametre sera utilise dans la page produit pour afficher les informations correspondantes a chaque produit.
 * @param {string} id L'ID du produit.
 * @return {HTMLElement} L'élément d'ancrage créé.
 */
function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" +id //On envoit un id a l'URL produit le +id est un params
    return anchor
}

/**
 *Creation de l'element image
 * @param {string} imageUrl L'URL de l'image.
 * @param {string} altTxt Le texte alternatif pour l'image.
 * @return {HTMLElement} L'élément image créé.
 */
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

/**
 *Creation de l'element h3 avec le nom specifie et ajoute la classe productName.
 * @param {string} name Le nom a utiliser pour créer l'élément h3.
 * @return {HTMLElement} L'element h3 cree avec la classe productName ajoutee.
 */
function makeH3(name) { //makeH3 va recevoir depuis la base de donnee un name.
    const h3 = document.createElement("h3")
    h3.textContent = name //Le texte du h3 correspond a ce qu'on a recup depuis la base de donnee sur l'element name.
    h3.classList.add("productName") //On voit sur le fichier index.html que notre h3 doit posseder la class productName.
    return h3
}

/**
 *Creation de l'element p
 * @param {string} description la description de l'article
 * @return {HTMLElement} le paragraphe créé
 */
function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}

/**
 *article devient enfant de anchor qui devient enfant de items
 * @param {HTMLElement} anchor L'élément HTML qui deviendra parent de l'élément article.
 * @param {HTMLElement} article L'élément HTML qui deviendra enfant de l'élément anchor.
 */
function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
    anchor.appendChild(article) 
}

/**
 *Pour que l'image, le h3 et le p soient des enfants de article.
 * @param {HTMLElement} article L'élément HTML dans lequel ajouter les éléments enfants.
 * @param {HTMLElement} image L'élément HTML de l'image à ajouter.
 * @param {HTMLElement} h3 L'élément HTML du titre à ajouter.
 * @param {HTMLElement} p L'élément HTML du paragraphe à ajouter.
 */
function appendElementsToArticle(article, image, h3, p) {
    article.appendChild(image) 
    article.appendChild(h3)
    article.appendChild(p)
}

// Tous nos kanap nous renvoient vers product.html mais ils nous passent des params differents a chaque fois. Il va falloir faire en sorte que chaque kanap nous renvoit de maniere dynamique a sa page perso.
// Dans le backend on a plusieurs URL a savoir product component etc et donc dans product on a la liste de tous nos produits et chaque produit a son id. 
// On veut donc recuperer l'id dans l'URL et ensuite faire une deuxieme requete au serveur pour avoir les infos qui nous interessent.
// C'est ces infos qu'on trouve sur nos pages produit donc sur notre product.html et de la meme maniere on va vouloir dynamiser tout ca dans cette fois si un product.js
