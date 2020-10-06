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
