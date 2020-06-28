var pastSearch = $("#searched-cities")
var cityArr = [];

//to display an error if user input is invalid
// function displayMessage(type, message) {
//    $("#msgE").text(message);
   


// }


$(document).ready(function(){
//event listener for search button
$("#searchBtn").on("click", function(){
    event.preventDefault();

    // create input variables
    var userInput = $("#user-input").val();
    console.log(userInput);
    var searchItem = $("<button>").text(userInput);
    //style buttons
    searchItem.addClass("search-list-style");
    // add search buttons to div
    $("#searched-cities").prepend(searchItem);

   
    //shows error message if user hits search with empty feild 
    // if (userInput === "") {
    //     displayMessage("error", "Please enter a city to be searched");
    // } 

    //sets user searches into local storage
    localStorage.setItem("cityArr",JSON.stringify(cityArr));
     //push value into a function
     cityArr.push(userInput);
     console.log(cityArr);
    //calls function to render user searches list
    renderPastSearch();

      // Constructing a URL to search Current Weather API for lat & long
    


});


//function to get the local storage and show in the  searched citites ul
function renderPastSearch() {
    var storedSearch = JSON.parse(localStorage.getItem("cityArr"));
    console.log(storedSearch);
    //Keep these stored search on the screen after refresh
 };
});