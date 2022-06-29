const cards = document.querySelectorAll('.card')
let hasFlippedCard = false;
let firstCard, secondCard;
let lockboard = false

function flipCard () {

    if (lockboard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return
    }

    secondCard = this
    checkForMatch();

}

function checkForMatch () {
    if(firstCard.dataset.memory === secondCard.dataset.memory) {
        disableCards()
        return;
    }

    unflipCards ()
}


function unflipCards () {

    lockboard = true

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard ();
}

function resetBoard() {
    [hasFlippedCard, lockboard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle () {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach( card => {
    card.addEventListener('click', flipCard)
})