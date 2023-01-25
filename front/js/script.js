// On va diviser le code en plein de petites fonctions pour que chaque fonction corresponde a un element et que ce soit plus facile de s'y retrouver.

//  1. On fetch des donnees qu'on va passer a addProduct
fetch("http://localhost:3000/api/products") 
    .then((res) => res.json()) 
    .then((data) => addProduct(data)) //On veut que les donnees recup soient directement transferees a la fonction addProduct.
    .catch((error) => console.error(error)) //Gestion des erreurs link front et back, route qui change.. serveur eteint, fetch rate.

//  2. add Product recupere l'id du premier item
//  3. On appelle la fonction makeAnchor avec en argument id
//  5. Une fois qu'il a le resultat, il le met dans la variable anchor
//  6. Il passe la variable a appendChildren
function addProduct(kanap) {

    // On ne veut pas que le data 0, on veut que ca nous affiche tous nos canap.
    kanap.forEach((kanap) => {
        
    let { _id, imageUrl, altTxt, name, description } = kanap

    let anchor = makeAnchor(_id) //On fait un appel de la fonction makeAnchor en lui donnant en argument id comme ca on va pouvoir manipuler la variable imageUrl dans notre fontion makeAnchor
    let article = document.createElement("article") // On creer l'element article
    let image = makeImage(imageUrl, altTxt)
    let h3 = makeH3(name)
    let p = makeParagraph(description)

    appendChildren(anchor, article) //Pour que la fonction appendChildren puisse mettre des elements en enfants.
    appendElementsToArticle(article, image, h3, p) //Pour que la fonction appendElementsToArticle puisse mettre les elements en enfants de article.
    })
}

//  4. On fabrique l'element anchor
function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" +id //On envoit un id a l'URL produit le +id est un params
    return anchor
}

// On fabrique l'element image
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

// On fabrique l'element h3
function makeH3(name) { //makeH3 va recevoir depuis la base de donnee un name.
    const h3 = document.createElement("h3")
    h3.textContent = name //Le texte du h3 correspond a ce qu'on a recup depuis la base de donnee sur l'element name.
    h3.classList.add("productName") //On voit sur le fichier index.html que notre h3 doit posseder la class productName.
    return h3
}

// On fabrique l'element p
function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}

//  7. appendChilren recupere la variable anchor
//  8. Il va chercher le items et il lui rajoute en enfant le anchor et le article qu'on lui a donne.
function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
    anchor.appendChild(article) //Puisqu'on veut que le article soit un enfant du href
}

function appendElementsToArticle(article, image, h3, p) {
    article.appendChild(image) //Pour que l'image, le h3 et le p soient des enfants de article.
    article.appendChild(h3)
    article.appendChild(p)
}

// Tous nos kanap nous renvoient vers product.html mais ils nous passent des params differents a chaque fois. Il va falloir faire en sorte que chaque kanap nous renvoit de maniere dynamique a sa page perso.
// Dans le backend on a plusieurs URL a savoir product component etc et donc dans product on a la liste de tous nos produits et chaque produit a son id. 
// On veut donc recuperer l'id dans l'URL et ensuite faire une deuxieme requete au serveur pour avoir les infos qui nous interessent.
// C'est ces infos qu'on trouve sur nos pages produit donc sur notre product.html et de la meme maniere on va vouloir dynamiser tout ca dans cette fois si un product.js
