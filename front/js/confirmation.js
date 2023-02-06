const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const orderId = urlParams.get("orderId")
    return orderId
}

function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

// Une fois la commande passee on peut clear le cache puisque ca ne sert plus a rien d'avoir des choses dedans.
function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}


