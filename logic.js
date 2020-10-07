var searchTerm = $("#userGame").val();

$("#searchReviewsButton").on("click", function(event){
    event.preventDefault();
    if($("#userGame").val() == ""){ // if search input is empty, dont do anything
        return;
    }
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
    $("#deals").empty();
    event.preventDefault();
    if($("#userGame").val() == ""){ // if search input is empty, dont do anything
        return;
    }
    //var queryURL = "https://www.cheapshark.com/api/1.0/games?title=" + searchTerm + "&limit=5&exact=0";
    var searchTerm = $("#userGame").val();
    var queryURL2 = "https://www.cheapshark.com/api/1.0/deals?&title=" + searchTerm + "&sortBy=Price&lowerPrice=5&pageSize=5"
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response2) {
        console.log(searchTerm);
        console.log(response2);
        //--- for loop to replace the generating and displaying deals
        for(i=0;i<5;i++){
            $("#deals").append(response2[i].title);
            $("#deals").append($("<div class=salePrice>")).append("$" + response2[i].salePrice)
            $("#deals").append("<div class=img>").append($("<img>").attr("src", response2[i].thumb));
            $("#deals").append($("<div class=a>").append(($("<a target=_blank class=site>")).attr("href", "https://www.cheapshark.com/redirect?dealID="+response2[i].dealID)));
            $(".site").text("link to deal");
            $("#userGame").val("");
        }
    })
});


// --------------------------------- Local Storage
function saveSearchToLS() {
    localStorage.setItem('gamesKey', JSON.stringify(searchArray)) //save the array into local storage
}
function displayPastSearches (){
    //clear the existing text
    //create new element to contain the new text
    //
}
function init(){
    var searchArray = [];
    var storedData = JSON.parse(localStorage.getItem('gamesKey'))
    if (storedData !== null) { //if localstorage in not empty, 
        searchArray = storedData; //make the array equal to storage
    }
    displayPastSearches ();
}

init(); //initialize by putting the stuff in local storage into an array
// and displaying the contents of the array
function saveToArray(){
    searchArray.push( $("#userGame").val() ); //add the latest search to the array
    saveSearchToLS(); //put the array into storage
    displayPastSearches (); //put the updated array contents into elements to be displayed
}







