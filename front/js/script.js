fetch("http://localhost:3000/api/products") /*Avec fecth on va catch une API via un URL qu'on aura mit en argument*/
    .then((res) => res.json()) /*.then est une promesse cad une fonction qui va elle meme recevoir une fonction depuis le fetch pour la transformer en autre chose, dans le cas present un json*/
    .then((data) => addProducts(data)) /*Maintenant quand tu recois du data, on veut le passer a la fonction addProducts. Tout ca va nous permettre de recuperer les donnees qu'on souhaite comme les liens des images des produits afin de pouvoir les afficher sur la page web via le js. */

    function addProducts(donnees) {
        const imageUrl = donnees[0].imageUrl
        
        let anchor = document.createElement("a") /*document est un objet (DOM) qui embarque tout une representation de la page qu'on veut afficher avec tout un tas de choses qu'on veut afficher. On peut imbriquer des fonctions sur cet objet dont createElement qui permet de  crée un élément HTML du type spécifié, dans notre cas on veut un anchor. On l'imbrique dans une variable avec let au cas ou on voudrait modifier sa valeur plus tard.*/
        anchor.href = imageUrl /*On va lui mettre un href qui va dependre de ce qu'on aura recu. Toute variable est locale par defaut cad non accessible a l'exterieur de la fonction dans laquelle elle est declaree.*/
        anchor.text = "Un super canape"
        const items = document.querySelector("#items") /*Pour selectionner un element on a une API que chrome nous donne et c'est document.querySelector qui est une fonction et on va lui passer un selecteur */
        if (items != null) { /*Pour mettre mon anchor a l'interieur de items on utilise la fonctions items.appendChild avec comme argument la variable qu'on veut mettre en enfant. */
            items.appendChild(anchor)
        } /*J'ai utilise une condition pour eviter le message d'erreur null*/
    }

