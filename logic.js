let searchArray = [];
function displayPastSearches() {
    $("#searchList").empty(); //clear input box text
    let lastFiveSearches = searchArray.slice(0, 5); //display last 5 searches
    lastFiveSearches.map(game => {
        let a = $("<a>").text(game);
        let li = $("<li>").addClass("previousSearches");
        li.append(a);
        $("#searchList").append(li);
    });
}
function saveIntoLS() {
    localStorage.setItem('C&RgameKey', JSON.stringify(searchArray)) //save the array into local storage
}
function init() {
    var storedData = JSON.parse(localStorage.getItem('C&RgameKey')) //get the saved searches from LS
    if (storedData !== null) { //if localstorage in not empty, 
        searchArray = storedData; //make the array equal to storage
    } // if LS is empty, searchArray stays empty
    displayPastSearches();
}
function saveSearch(searchTerm) {
    let index = searchArray.indexOf(searchTerm); //returns -1 if the term doesn't exist in array
    if (index >= 0) { // if the searchTerm exists in searchArray
        searchArray.unshift(searchArray.splice(index, 1)[0]); // move the existing item to the end of array
    } else { //if it doesnt already exist
        searchArray.unshift(searchTerm); //add the latest search to the start of the array
    }
    saveIntoLS(); //put the array into storage
    displayPastSearches(); //put the updated array contents into elements to be displayed
}

function createCards1(response) {
    console.log(response)
    response.map(item => {
        let card = $("<div>").addClass("col s12 m7 card").attr("dealId", item.dealID);
        $("#reviewsDiv").append(card);

        let horzCard = $("<div id=cardHorizontal>").addClass("card horizontal");
        card.append(horzCard);

        let cardImg = $("<div>").addClass("card-image");
        cardImg.prepend($("<img>").addClass("ratingPic").attr("src", item.thumb));
        horzCard.prepend(cardImg);
        
        let cardStacked = $("<div>").addClass("card-stacked");
        horzCard.append(cardStacked);

        let cardContent = $("<div>").addClass("card-content");
        cardContent.prepend($("<h5>").text(item.title))
        .append($("<p>").text("Steam Score (out of 100): " + item.steamRatingPercent + " (" + item.steamRatingText + ")"))
        .append($("<p>").text("___________"))
        .append($("<p>").text("Metacritic Score (out of 100): " + item.metacriticScore));
        cardStacked.append(cardContent);
    })
}
function createCards2(response2) {
    console.log(response2)
    response2.map(item => {
        let card = $("<div>").addClass("col s12 m7 card").attr("dealId", item.dealID);
        $("#deals").append(card);

        let horzCard = $("<div id=cardHorizontal>").addClass("card horizontal");
        card.append(horzCard);

        let cardImg = $("<div>").addClass("card-image");
        cardImg.prepend($("<img>").addClass("ratingPic").attr("src", item.thumb));
        horzCard.prepend(cardImg);
        
        let cardStacked = $("<div>").addClass("card-stacked");
        horzCard.append(cardStacked);

        let cardContent = $("<div>").addClass("card-content");
        cardContent.prepend($("<p>").text(item.title))
        .append($("<p class=salePrice>").text("$" + item.salePrice));
        cardStacked.append(cardContent);

        let cardAction = $("<div>").addClass("card-action");
        cardAction.append($("<a target=_blank>").text("Go to the Deal").attr("href", "https://www.cheapshark.com/redirect?dealID=" + item.dealID));
        cardStacked.append(cardAction)
    })
}

function getCocktail() {
    var queryURLbeer = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    $.ajax({
        url: queryURLbeer,
        method: "GET"
    }).then(function (responseBeer) {
        //console.log(responseBeer);
        console.log("Cocktail Name: " + responseBeer.drinks[0].strDrink);
        //console.log(responseBeer.drinks[0].strDrinkThumb);
        $("#drinkInfo").append($("<div id=tryCocktail>"));
        $("#tryCocktail").append($("<h5>").text("Try a cocktail with your game!"));
        $("#drinkInfo").append("Cocktail Name: " + responseBeer.drinks[0].strDrink);
        $("#drinkInfo").append("<img id=cocktailImage>");
        $("#cocktailImage").attr("src", responseBeer.drinks[0].strDrinkThumb)
        $("#cocktailImage").attr("style", "width:100%;")
    });
}


$(document).ready(function () {
    init(); //initialize by putting the stuff in local storage into an array
    // and displaying the contents of the array

    $("#searchReviewsButton").on("click", function (event) {
        event.preventDefault();
        var searchTerm1 = $("#userGame").val().trim(); // get the value in the input box

        $("#deals").empty(); // empty any elements (cards specifically) already existing in deals div
        $(".reviews").empty(); //empties reviews div for user to be able to more easily see the deals more easily
        $("#drinkInfo").empty(); // empties drinks div

        if (searchTerm1 !== "") { // if search input is not empty, save the search term and make API call
            saveSearch(searchTerm1);
            var queryURL = "https://www.cheapshark.com/api/1.0/deals?&title=" + searchTerm1 + "&pageSize=10&exact=0";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                createCards1(response);
            })
        } else { // if input is empty, don't do anything
            //alert("Please enter a valid input!")
            return;
        }

    });

    $("#searchDealsButton").on("click", function (event) {
        $("#deals").empty(); // empty any elements (cards specifically) already existing in deals div
        $(".reviews").empty(); //empties reviews div for user to be able to more easily see the deals more easily
        event.preventDefault();
        var searchTerm2 = $("#userGame").val().trim();
        if (searchTerm2 !== "") { // if search input is not empty, save the search term and make API call
            saveSearch(searchTerm2);
            var queryURL2 = "https://www.cheapshark.com/api/1.0/deals?&title=" + searchTerm2 + "&sortBy=Price&lowerPrice=5&pageSize=5"
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response2) {
                //console.log(searchTerm);
                console.log(response2);
                createCards2(response2);
                $("#drinkInfo").empty();
                getCocktail();
            })
        } else {
            //alert("Please enter a valid input!")
            return;
        }

    });

    $(".pastSearches").on("click", function (event) { // if any of the past searches are clicked
        $("#userGame").val($(event.target).text()); //fill the input with the clicked item's text
        $("#searchDealsButton").trigger("click"); //trigger search deals button click
    });

});
