$(document).ready(startApp);

var canIClickCard = true;
var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 2;
var matchCounter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var gamesPlayed = 0;

function startApp(){
    applyEventHandlers();
}

function applyEventHandlers(){
    $(".card").click(chooseCard);
    $("#button").click(resetButtonClick);
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
        attempts++;

        var firstCardImageSource = $(firstCardClicked).find('img').attr('src');
        var secondCardImageSource = $(secondCardClicked).find('img').attr('src');

        if(firstCardImageSource === secondCardImageSource){
            matchCounter++;
            matches++;
            firstCardClicked = null;
            secondCardClicked = null;
            displayStats();

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
            setTimeout(flipCardsBack, 1000 );
            displayStats();
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

function displayStats(){
    $("#games-played-value").text(gamesPlayed);
    $("#attempts-value").text(attempts);
    $("#accuracy-value").text(calculateGameAccuracy());
}

function calculateGameAccuracy(){
    if(attempts === 0){
        return 0;
    }
    accuracy = Math.round((matches/attempts) * 100);
    return accuracy + "%";
}

function resetStats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    displayStats();
}

function resetButtonClick(){
    gamesPlayed++;
    resetStats();
    displayStats();
    $(".card-back").removeClass("hide-card");
}



















