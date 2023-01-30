const cart = []

retrieveItemsFromCache()
cart.forEach(item => displayItem(item))

function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length //On recupere ce que l'utilisateur a envoyer dans le localstorage grace a ses orders et on voudra l'afficher dans le panier.

    for(let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item) //parse nous transforme item en objet. C'est le contraire de stringify.
        cart.push(itemObject)
    }
}

function displayItem(item) {
    const article =makeArticle(item) //Fabrication d'un article
    const imageDiv = makeImageDiv(item) //Fabrication d'une imageDiv
    article.appendChild(imageDiv) //Puis imageDiv devient enfant de article

    const cartItemContent = makeCartContent(item) //Fabrication d'un cartcontent
    article.appendChild(cartItemContent)
    displayArticle(article)
}

function makeCartItemContent() {
    const div = document.createElement("div")
    div.classList.add("cart__item__content")
}

function makeCartContent(item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)
    
    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

function makeDescription(item) {
    const description = document.createElement("div") //On creer un element div
    description.classList.add("cart__item__content__description") //On lui ajoute cart__item__content__description

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

function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    return settings
}

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
    settings.appendChild(input)
}

function displayArticle(article) {
    document.querySelector("#cart__item").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("card__item__img")
    
    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}