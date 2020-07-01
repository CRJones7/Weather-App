var pastSearch = $("#searched-cities")
var cityArr = ["Austin", "Denver", "New York", ];

var storedSearch = JSON.parse(localStorage.getItem("cityArr"));


$(document).ready(function () {

    initBtns();
    function initBtns() {
    
            console.log(storedSearch);
            var defaultCity = "Austin";
            if (storedSearch){
            for (var i = 0; i < 3; i++){
                    $("#searched-cities").append($("<button>").text(storedSearch[i]).addClass("past-searches"));
                    } 
                defaultCity = storedSearch[0];
            }
            firstCall(defaultCity);
    };

    //event listener for search button
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        userSearch();
        $('#user-input').val('');
    });

    
    function userSearch() {
        // create input variables
        var userInput = $("#user-input").val();
       
        var searchItem = $("<button>").text(userInput).addClass("past-searches");

        // add search buttons to div
        $("#searched-cities").prepend(searchItem);


        //sets user searches into local storage
        localStorage.setItem("cityArr", JSON.stringify(cityArr));
        //push value into a function
        cityArr.push(userInput);
        firstCall(userInput);
        //calls function to render user searches list
    };
        


        function firstCall(userInput) {  
            

        // Constructing a URL to search Current Weather API for lat & long
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput
            + "&appid=b1a89a367b9a4ae4aad5428008542c41&units=imperial";
            
        //perform AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        
            //promised data from API
            .then(function (response) {
                

                // console.log(results);
                var lat = response.coord.lat;
                console.log(lat);
                var long = response.coord.lon;
                console.log(long);

                //creating variables for lat and long to be passed
               let latLon = "lat=" + lat + "&lon=" + long;
                console.log(latLon);
                

                //calling second fucntion
                currentWeather(latLon);

                //creating div to be added to
                var currentDiv = $("<div>").addClass("current");
                $(".current-day").html(currentDiv);

                //creating variables from results
                var date = moment().format("(MM/DD/YYYY)");
                var cityName = response.name;
                var icon = response.weather[0].icon;
                var iconImg = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                var temp = "Temperature: " + Math.floor(response.main.temp) + "°F";
                var humidity = "Humidity: " + response.main.humidity + "%";
                var wSpeed = "Wind Speed: " + response.wind.speed + "mph";
                console.log(wSpeed);
                console.log(humidity);
                console.log(temp);

                
                //creating elements for data
                var pN = $("<p>.temp").text(cityName).addClass("currentCityName");
                var pD = $("<p>").text(date).addClass("the-date");
                var iA = $("<img>").attr("src", iconImg).addClass("current-img");
                var pT = $("<p>.temp").text(temp).addClass("current-weather");
                var pH = $("<p>.hum").text(humidity).addClass("current-weather");
                var pS = $("<p>.wS").text(wSpeed).addClass("current-weather");

                //appending collected weather
                currentDiv.append(pN);
                currentDiv.append(pD);
                currentDiv.append(iA);
                currentDiv.append(pT);
                currentDiv.append(pH);
                currentDiv.append(pS);
                

            });
            
    };

    


    function currentWeather(latLon) {
        //URL for one call api
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?" +
    latLon + "&appid=b1a89a367b9a4ae4aad5428008542c41&units=imperial";
console.log(queryURL2);

        $.ajax({
            url: queryURL2,
            method: "GET"
        })

            .then(function (response) {

                //var for results
                var results = response;
                
                //var for getting uv index
                var uvIndex = results.current.uvi;
                
                
                //creating div to add to
                var currentDiv = $("<div>").addClass("current");
                $(".current-day").append(currentDiv);

                //creating element for current uvi
                var pUV = $("<p>").text("UV Index: " + uvIndex);
                //appending to currentDiv
                currentDiv.append(pUV);

                //clearing the children of the class forecast 
                $(".forecast").html("");

                //5 day forcast
            for (var i = 1; i < 6; i++) {
                var icon = response.daily[i].weather[0].icon;
                var iconPicture = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                var forecastCard = $("<div>").addClass("card forecast-card");
                $(".forecast").append(forecastCard);

                var title = $("<h2>").addClass("forecast-title").text(moment(response.daily[i].dt, "X").format("MMM Do"));
                $(forecastCard).append(title);

                var forecastPic = $("<img>").attr("src", iconPicture).addClass("forecast-image");
                $(forecastCard).append(forecastPic);

                var cardBody = $("<div>").addClass("card-body");
                $(forecastCard).append(cardBody);

                $(cardBody).append($("<p>").addClass("card-text").text("Temp: " + Math.floor(results.daily[i].temp.day) + "°F"));
                $(cardBody).append($("<p>").addClass("card-text").text("Humidity: " + results.daily[i].humidity + "%"));


            }



            });


    };

    $('#searched-cities').on('click', '.past-searches', function() {
        event.preventDefault();
        var searchAgain = $(this).text();
        firstCall(searchAgain);

    });

        
        
});


