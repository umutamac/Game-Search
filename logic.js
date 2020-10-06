$("#searchReviewsButton").on("click", function(event){
    event.preventDefault();
    var searchTerm = $("#userGame").val();
    var queryURL = "http://www.gamespot.com/api/games/?api_key=" + apiKeyGameSpot;
    var apiKeyGameSpot = "1c94492f4e0d712037278223f041224bd213fadd";
});

$("#searchDealsButton").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#userGame").val();
    var queryURL2 = "https://www.cheapshark.com/api/1.0/deals?&title=" + searchTerm + "&pageSize=5"
    // "https://www.cheapshark.com/api/1.0/games?title=" + searchTerm + "&limit=5&exact=0";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response2) {
        console.log(response2);
        $("#userGame").val("");
        $("#deals").append(response2[0].title);
    })
})


//--------------------------------- Local Storage
let searchArray = localStorage.getItem('gamesKey')
? JSON.parse(localStorage.getItem('gamesKey'))
: [];


localStorage.setItem('gamesKey', JSON.stringify(searchArray))
var storedData = JSON.parse(localStorage.getItem('gamesKey'))


function saveSearch() {
    searchArray.push(searchTerm);
    localStorage.setItem('gamesKey', JSON.stringify(searchArray))
    input.value = "";
}