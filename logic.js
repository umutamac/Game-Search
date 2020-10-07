//var searchTerm = $("#userGame").val();
var searchArray = [];

function saveSearchToLS() {
    localStorage.setItem('gamesKey', JSON.stringify(searchArray)) //save the array into local storage
}
function displayPastSearches (){
    //clear the existing text
    //create new element to contain the new text
    //
}
function init(){
    var storedData = JSON.parse(localStorage.getItem('gamesKey'))
    if (storedData !== null) { //if localstorage in not empty, 
        searchArray = storedData; //make the array equal to storage
    }
    displayPastSearches ();
}
function saveToArray(){
    searchArray.push( $("#userGame").val() ); //add the latest search to the array
    saveSearchToLS(); //put the array into storage
    displayPastSearches (); //put the updated array contents into elements to be displayed
}
//init(); //initialize by putting the stuff in local storage into an array
// and displaying the contents of the array





//---------------------- ajax calls
$("#searchReviewsButton").on("click", function(event){
    event.preventDefault();
    if($("#userGame").val() == ""){ // if search input is empty, dont do anything
        return;
    }
    //saveToArray();
    var searchTerm = $("#userGame").val();
    var apiKeyGiantBomb = "70096e40d8eb37e5de61445e8ef17ead73363d5e";
    var queryURL = "https://www.gamespot.com/api/reviews/?api_key=" + apiKeyGiantBomb;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
});

$("#searchDealsButton").on("click", function (event) {
    $("#deals").empty(); // empty any elements (cards specifically) already existing in deals div
    event.preventDefault();
    if($("#userGame").val() == ""){ // if search input is empty, dont do anything
        return;
    }
    //saveToArray();
    //var queryURL = "https://www.cheapshark.com/api/1.0/games?title=" + searchTerm + "&limit=5&exact=0";
    var searchTerm = $("#userGame").val();
    var queryURL2 = "https://www.cheapshark.com/api/1.0/deals?&title=" + searchTerm + "&sortBy=Price&lowerPrice=5&pageSize=5"
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response2) {
        console.log(searchTerm);
        console.log(response2);
        for(i=0;i<5;i++){ //--- for loop to replace the generating and displaying deals
            $("#deals").append( $("<div>").addClass("col s12 m7 card"+[i]) );
            //$(".card"+[i]).prepend($("<h2 class=header>").text("Horizontal Card"));
            $(".card"+[i]).append($("<div>").addClass("card horizontal"));

            $(".card"+[i]+" .card.horizontal").prepend($("<div>").addClass("card-image"));
            $(".card"+[i]+" .card-image").prepend($("<img>").attr("src",response2[i].thumb));

            $(".card"+[i]+" .card.horizontal").append($("<div>").addClass("card-stacked"));

            $(".card"+[i]+" .card-stacked").prepend($("<div>").addClass("card-content"));
            $(".card"+[i]+" .card-content").prepend($("<p>").text(response2[i].title));
            $(".card"+[i]+" .card-content").append($("<p class=salePrice>").text("$"+response2[i].salePrice));

            $(".card"+[i]+" .card-stacked").append($("<div>").addClass("card-action"));
            $(".card"+[i]+" .card-action").append($("<a target=_blank>").text("Go to the Deal").attr("href", "https://www.cheapshark.com/redirect?dealID="+response2[i].dealID));

            // $("#deals").append(response2[i].title);
            // $("#deals").append($("<div class=salePrice>")).append("$" + response2[i].salePrice)
            // $("#deals").append("<div class=img>").append($("<img>"));
            // $("img").attr("src", response2[i].thumb)
            // $("#deals").append($("<div class=a>").append(($("<a target=_blank class=site>")).attr("href", "https://www.cheapshark.com/redirect?dealID="+response2[i].dealID)));
            // $(".site").text("link to deal");
            $("#userGame").val("");
        }
    })
});








