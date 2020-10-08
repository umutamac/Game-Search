$(document).ready(function () {

    //var searchTerm = $("#userGame").val();
    var searchArray = [];

    function saveSearchToLS() {
        localStorage.setItem('gamesKey', JSON.stringify(searchArray)) //save the array into local storage
    }
    function displayPastSearches() {
        $("#searchList").empty();//clear the existing text
        for (var i = 0; i < 5; i++) { // Display last 5 searches
            var seacrhArrayElement = searchArray[i];
            $("#searchList").append($("<li>").attr("data-index", i).text(seacrhArrayElement));// Creaete a new li for each past search
        }
    }
    function init() {
        var storedData = JSON.parse(localStorage.getItem('gamesKey'))
        if (storedData !== null) { //if localstorage in not empty, 
            searchArray = storedData; //make the array equal to storage
        }
        displayPastSearches();
    }
    function saveToArray() {
        searchArray.unshift($("#userGame").val()); //add the latest search to the array
        saveSearchToLS(); //put the array into storage
        displayPastSearches(); //put the updated array contents into elements to be displayed
    }
    init(); //initialize by putting the stuff in local storage into an array
    // and displaying the contents of the array





    //---------------------- ajax calls
    $("#searchReviewsButton").on("click", function (event) {
        $("#deals").empty(); // empty any elements (cards specifically) already existing in deals div
        $(".reviews").empty(); //empties reviews div for user to be able to more easily see the deals more easily
        $("#drinkInfo").empty(); // empties drinks div
        event.preventDefault();
        if ($("#userGame").val() == "") { // if search input is empty, dont do anything
            return;
        }
        saveToArray();
        var searchTerm = $("#userGame").val();
        var queryURL = "https://www.cheapshark.com/api/1.0/deals?&title=" + searchTerm + "&pageSize=10&exact=0";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                $("#reviewsDiv").append($("<div>").addClass("col s12 m7 card cardReviews" + [i]));
                // $(".cardReviews"+[i]).prepend($("<h2 class=header>").text("Horizontal Card"));
                $(".cardReviews" + [i]).append($("<div id=cardHorizontal>").addClass("card horizontal"));

                $(".cardReviews" + [i] + " .card.horizontal").prepend($("<div>").addClass("card-image"));
                $(".cardReviews" + [i] + " .card-image").prepend($("<img>").addClass("ratingPic").attr("src", response[i].thumb));

                $(".cardReviews" + [i] + " .card.horizontal").append($("<div>").addClass("card-stacked"));

                $(".cardReviews" + [i] + " .card-stacked").prepend($("<div>").addClass("card-content"));
                $(".cardReviews" + [i] + " .card-content").prepend($("<h5>").text(response[i].title));
                $(".cardReviews" + [i] + " .card-content").append($("<p>").text("Steam Score (out of 100): " + response[i].steamRatingPercent + " (" + response[i].steamRatingText + ")"));
                $(".cardReviews" + [i] + " .card-content").append($("<p>").text("___________"));
                $(".cardReviews" + [i] + " .card-content").append($("<p>").text("Metacritic Score (out of 100): " + response[i].metacriticScore));
            }
        })
    });

    $("#searchDealsButton").on("click", function (event) {
        $("#deals").empty(); // empty any elements (cards specifically) already existing in deals div
        $(".reviews").empty(); //empties reviews div for user to be able to more easily see the deals more easily
        event.preventDefault();
        if ($("#userGame").val() == "") { // if search input is empty, dont do anything
            return;
        }
        saveToArray();
        //var queryURL = "https://www.cheapshark.com/api/1.0/games?title=" + searchTerm + "&limit=5&exact=0";
        var searchTerm = $("#userGame").val();
        var queryURL2 = "https://www.cheapshark.com/api/1.0/deals?&title=" + searchTerm + "&sortBy=Price&lowerPrice=5&pageSize=5"
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response2) {
            console.log(searchTerm);
            console.log(response2);
            for (i = 0; i < response2.length; i++) { //--- for loop to replace the generating and displaying deals
                $("#deals").append($("<div>").addClass("col s12 m7 card" + [i]));
                //$(".card"+[i]).prepend($("<h2 class=header>").text("Horizontal Card"));
                $(".card" + [i]).append($("<div>").addClass("card horizontal"));

                $(".card" + [i] + " .card.horizontal").prepend($("<div>").addClass("card-image"));
                $(".card" + [i] + " .card-image").prepend($("<img>").addClass("dealPic").attr("src", response2[i].thumb));

                $(".card" + [i] + " .card.horizontal").append($("<div>").addClass("card-stacked"));

                $(".card" + [i] + " .card-stacked").prepend($("<div>").addClass("card-content"));
                $(".card" + [i] + " .card-content").prepend($("<p>").text(response2[i].title));
                $(".card" + [i] + " .card-content").append($("<p class=salePrice>").text("$" + response2[i].salePrice));

                $(".card" + [i] + " .card-stacked").append($("<div>").addClass("card-action"));
                $(".card" + [i] + " .card-action").append($("<a target=_blank>").text("Go to the Deal").attr("href", "https://www.cheapshark.com/redirect?dealID=" + response2[i].dealID));

                $("#userGame").val("");
            }
            var queryURLbeer = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
            $.ajax({
                url: queryURLbeer,
                method: "GET"
            }).then(function (responseBeer) {
                console.log(responseBeer);
                console.log("Cocktail Name: " + responseBeer.drinks[0].strDrink);
                console.log(responseBeer.drinks[0].strDrinkThumb);
                $("#drinkInfo").append($("<div id=tryCocktail>"));
                $("#tryCocktail").append($("<h5>").text("Try a cocktail with your game!"));
                $("#drinkInfo").append("Cocktail Name: " + responseBeer.drinks[0].strDrink);
                $("#drinkInfo").append("<img id=cocktailImage>");
                $("#cocktailImage").attr("src", responseBeer.drinks[0].strDrinkThumb)
                $("#cocktailImage").attr("style", "width:100%;")
            });
        })
    });

});
