//restituisce un numero casuale compreso nel range
cy.getRandomNumber = (rangeMin, rangeMax) => {
    let min = Math.ceil(rangeMin);
    let max = Math.floor(rangeMax);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


cy.getTomorrowDate = () => {
    let $today = new Date();
    let $tomorrow = new Date($today);
    $tomorrow.setDate($today.getDate() + 1);

    let dd = $tomorrow.getDate();
    let mm = $tomorrow.getMonth()+1;
    let yyyy = $tomorrow.getFullYear();
    let tomorrowDate = (dd < 10 ? '0' + dd : dd) + '/' + (mm < 10 ? '0' + mm : mm) + '/' + yyyy + ' 5:20 PM';
    return tomorrowDate; // prints 28/04/2020

}

