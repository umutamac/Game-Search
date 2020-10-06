$("#searchButton").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#userGame").val();
    var queryURL = "https://www.cheapshark.com/api/1.0/games?title=" + searchTerm + "&limit=5&exact=0";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // $("#userGame").text("");
    })
})





//--------------------------------- Local Storage
var gameSearchInput = $('#game-search-input').val();

let searchArray = localStorage.getItem('gamesKey')
? JSON.parse(localStorage.getItem('gamesKey'))
: []

localStorage.setItem('gamesKey', JSON.stringify(searchArray))
var storedData = JSON.parse(localStorage.getItem('gamesKey'))


$("form").submit( function(event) {
    event.preventDefault()

    itemsArray.push(input.value);
    localStorage.setItem('gamesKey', JSON.stringify(searchArray))
    input.value = "";
})