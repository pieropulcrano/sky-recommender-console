//restituisce un numero casuale compreso nel range
cy.getRandomNumber= (rangeMin,rangeMax) => {
   let min = Math.ceil(rangeMin);
   let max = Math.floor(rangeMax);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


