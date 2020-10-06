$("#searchReviewsButton").on("click", function(event){
    event.preventDefault();
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