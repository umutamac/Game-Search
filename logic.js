var searchTerm = $("#userGame").val();
$("#searchReviewsButton").on("click", function(event){
    event.preventDefault();

    var searchTerm = $("#userGame").val();
    var queryURL = "URL: http://www.gamespot.com/api/reviews/?api_key=" + apiKeyGameSpot + "";
    var apiKeyGameSpot = "1c94492f4e0d712037278223f041224bd213fadd";
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
    var queryURL2 = "https://www.cheapshark.com/api/1.0/deals?&title=" + searchTerm + "&pageSize=5"
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response2) {
        console.log(searchTerm);
        console.log(response2);
        $("#deals").append(response2[0].title);
        $("#userGame").val("");
    })
});


// --------------------------------- Local Storage
function saveSearch() {
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

$("button").click( function(event){ // when a button is clicked...
    event.preventDefault(); // do not refresh
    if($("#userGame").val()==""){ // if search input is empty, dont do anything
        return;
    }
    console.log(searchTerm);
    searchArray.push(searchTerm); //add the latest search to the array
    saveSearch(); //put the array into storage
    displayPastSearches (); //put the updated array contents into elements to be displayed
});







