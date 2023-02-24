const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

/**
 * Récupère l'ID de commande présent dans les paramètres de l'URL de la page actuelle.
 * 
 * @returns {string|null} L'ID de commande s'il est présent dans les paramètres de l'URL, null sinon.
 */
function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const orderId = urlParams.get("orderId")
    return orderId
}

/**
 * Affiche l'ID de commande dans un élément HTML spécifié.
 * 
 * @param {string} orderId L'ID de commande à afficher.
 */
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

/**
 * Une fois la commande passee on peut clear le cache puisque ca ne sert plus a rien d'avoir des choses dedans.
 */
function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}