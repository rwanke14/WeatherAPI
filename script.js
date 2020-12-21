// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast



/*
Dashboard:
-Weather API
-search input bar for looking up the city
-card area for displaying city you looked up and the days current details
-cards for the next 5 days.
-City added to search history - sits at side and you can go back to it.
-local storage keeps what you have been searching and when you return it you still see it.
*/



var APIKey = "d36c6b6f4fc6a7326b1f10197ffd5d6d";

var searchBtn = $(".btn");

var searchedData = $("#searchedData");
var currentDayEl = $("#currentDayEl");
var addCity = $("<div>");
var addDate = $("<li>");
var addIcon = $("<img>");
var addTemp = $("<li>");
var addHumidity = $("<li>");
var addWindIndex = $("<li>");
var addUV = $("<li>");


$(searchBtn).on("click", function () {
    var searchCity = $("#searchCity").val();
    var weatherQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=" + APIKey;
    console.log("click")
    console.log(searchCity)
    
    var date = moment().format("MM/DD/YYYY")

    $.ajax({
        url: weatherQuery,
        method: "GET"
      }).then(function(response) {
        
        console.log(weatherQuery)
        
        console.log (response);

        //var date = moment().format("MM/DD/YYYY")

        var weatherIcon = response.weather[0].icon;

        var iconURL = "http://openweathermap.org/img/w" + weatherIcon + ".png";

        $(addIcon).html("<img src=" + iconURL + ">");
      
        //$(weatherIcon).html('<img src = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png">');

        $(addCity).text(response.name + " " + date + " " + weatherIcon);
        $(addCity).appendTo(currentDayEl);

 
        console.log(addDate)


        console.log (addIcon)

        $(addTemp).text("Temperature: " + response.main.temp);
        $(addTemp).appendTo(addCity);
        console.log (addTemp)

        $(addHumidity).text("Humidity: " + response.main.humidity);
        $(addHumidity).appendTo(addTemp);
        console.log(addHumidity)

        $(addWindIndex).text("Wind Index: " + response.wind.speed);
        $(addWindIndex).appendTo(addHumidity);
        console.log (addWindIndex)




        //UV Index Query & setting up color indication changes.

        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;

        var UVIndex = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;

        $.ajax({
          url: UVIndex,
          method: "GET"
        }).then(function(index) {

          var uvColor = $("<span>" + index.value + "</span>");
          
          $(addUV).text("UV Index: ");
          $(addUV).append(uvColor);
          $(addUV).appendTo(addWindIndex);
  
          console.log(index.value);
          console.log(uvColor)
          console.log(addUV)

          if (index.value < 3) {

            //var uvColor = $("<span>");

            $(uvColor).addClass("uvLow");
            //$(addUV).append(uvColor);
            

          } else if (index.value >= 3 && index.value <= 7) {

            $(uvColor).addClass("uvMod");

          } else if (index.value > 7) {

            $(uvColor).addClass("uvHigh");

          }
  
  
        });


        // var UVIndexURL =  
        // $(addUV).text("UV Index: " + UVIndexURL);
        // $(addUV).appendTo(addWindIndex);
        // console.log (addUV)

    
      });

      var fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity  + "&cnt=5&units=imperial&appid=" + APIKey;
      
      console.log(fiveDayQuery)

      $.ajax({
        url: fiveDayQuery,
        method: "GET"
      }).then(function(days) {

        console.log(days)

        
        //5-day forecast that displays the date, an icon representation 
        // of weather conditions, the temperature, and the humidity

        for (var i = 0; i < days.list.length; i+= 5){

          var fiveDay = $("#fiveDay");
          //var nextDay = $("<p>");
          //$(nextDay).text(date + days.list[i]);
          //$(nextDay).appendTo(fiveDay);

          var temp5 = $("<p>");
          $(temp5).text(days.list[i].temp);
          $(temp5).appendTo(fiveDay);
          


        }


      });
    
});


function prevSearchedCities () {




}




