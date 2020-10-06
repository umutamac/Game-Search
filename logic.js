var searchTerm = $("#userGame").val();
$("#searchReviewsButton").on("click", function(event){
    event.preventDefault();

    var searchTerm = $("#userGame").val();
    var apiKeyGameSpot = "1c94492f4e0d712037278223f041224bd213fadd";
    var queryURL = "https://www.gamespot.com/api/reviews/?api_key=" + apiKeyGameSpot;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
});

$("#searchDealsButton").on("click", function (event) {
    event.preventDefault();
    saveSearch( $("#userGame").val() ); // Store the user input
    if($("#userGame").val() == ""){ // if search input is empty, dont do anything
        return;
    }
    //var queryURL = "https://www.cheapshark.com/api/1.0/games?title=" + searchTerm + "&limit=5&exact=0";
    var searchTerm = $("#userGame").val();
    var queryURL2 = "https://www.cheapshark.com/api/1.0/deals?&title=" + searchTerm + "&sortBy=Price&pageSize=5"
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response2) {
        console.log(searchTerm);
        console.log(response2);
        $("#deals").append(response2[0].title);
        $("#deals").append($("<div class=salePrice>")).append("$" + response2[0].salePrice)
        $("#deals").append("<div class=img>").append($("<img>"));
        $("img").attr("src", response2[0].thumb)
        $("#deals").append($("<div class=img>").append(($("<a target=_blank class=site>")).attr("href", "https://www.cheapshark.com/redirect?dealID="+response2[0].dealID)));
        $(".site").text("link to deal");
        $("#userGame").val("");
    })
});


// --------------------------------- Local Storage
let searchArray = localStorage.getItem('gamesKey')
? JSON.parse(localStorage.getItem('gamesKey'))
: [];


localStorage.setItem('gamesKey', JSON.stringify(searchArray))
var storedData = JSON.parse(localStorage.getItem('gamesKey'))


function saveSearch(searchTerm) {
    console.log(searchTerm);
    searchArray.push(searchTerm);
    localStorage.setItem('gamesKey', JSON.stringify(searchArray))
}

