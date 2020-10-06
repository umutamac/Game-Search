var searchTerm = $("#userGame").val(); // user input to search bar

$("#searchButton").on("click", function (event) {
    event.preventDefault();
    saveSearch();
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

