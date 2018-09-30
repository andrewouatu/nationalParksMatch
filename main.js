$(document).ready(startApp);

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 2;
var matchCounter = 0;
var canIClickCard = true;

function startApp(){
    applyEventHandlers();
}

function applyEventHandlers(){
    $(".card").click(chooseCard);
}

function chooseCard(){

    if(canIClickCard === false){
        return;
    }

    //Prevents same card from being clicked twice. If card clicked has class of hide-card, exit function
    if($(event.currentTarget).find(".card-back").hasClass("hide-card")){
        return;
    }

    $(event.currentTarget).find(".card-back").addClass("hide-card");


    if(firstCardClicked === null){
        firstCardClicked = event.currentTarget;
        return;
    }

    else{
        secondCardClicked = event.currentTarget;

        var firstCardImageSource = $(firstCardClicked).find('img').attr('src');
        var secondCardImageSource = $(secondCardClicked).find('img').attr('src');

        if(firstCardImageSource === secondCardImageSource){
            matchCounter++;
            firstCardClicked = null;
            secondCardClicked = null;

                if(matchCounter === totalPossibleMatches){
                    console.log("YOU WON!");
                }

                else{
                    return;
                }

        }
        else{
            //If cards don't match, wait 2 second and flip cards back
            canIClickCard = false;
            setTimeout(flipCardsBack, 2000 );
            return;
        }

    }

}

//Displays the back side of the card and resets first card and second card to null
function flipCardsBack(){
    $(firstCardClicked).find(".card-back").removeClass("hide-card");
    $(secondCardClicked).find(".card-back").removeClass("hide-card");
    firstCardClicked = null;
    secondCardClicked = null;
    canIClickCard = true;
}












