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
var searchResults = $("#searchResults");
var currentDayEl = $("#currentDayEl");
var addCity = $("<div>");
$(addCity).addClass("currentCity");
var addDate = $("<li>");
var addIcon = $("<img>");
var addTemp = $("<li>");
var addHumidity = $("<li>");
var addWindIndex = $("<li>");
var addUV = $("<li>");

var searchedCities = [];
var searchCity = $("#searchCity").val();



  $(searchBtn).on("click", function (event) {
    event.preventDefault()

    var searchCity = $("#searchCity").val();

    //clear forecast boxes when new city is entered so that new information shows at top.
    $(fiveDay1).empty();
    $(fiveDay2).empty();
    $(fiveDay3).empty();
    $(fiveDay4).empty();
    $(fiveDay5).empty();


    localStorage.setItem("prevSearched", JSON.stringify(prevSearched));
    //localStorage.setItem("city", searchCity);
    console.log(localStorage.getItem("city"));



    var weatherQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=" + APIKey;
    console.log("click")
    console.log(searchCity)

    var date = moment().format("MM/DD/YYYY")

    $.ajax({
      url: weatherQuery,
      method: "GET"
    }).then(function (response) {

      console.log(weatherQuery)

      console.log(response);


      var weatherIcon = response.weather[0].icon;

      var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      addIcon.attr("src", iconURL);
      addIcon.attr("class", "weatherImg")
      console.log(iconURL)


      $(addCity).text(response.name + " (" + date + ") ");
      $(addCity).appendTo(currentDayEl);
      $(addIcon).appendTo(currentDayEl);


      console.log(addDate)


      console.log(addIcon)

      $(addTemp).text("Temperature: " + response.main.temp + " F");
      $(addTemp).appendTo(addCity);
      console.log(addTemp)

      $(addHumidity).text("Humidity: " + response.main.humidity + "%");
      $(addHumidity).appendTo(addTemp);
      console.log(addHumidity)

      $(addWindIndex).text("Wind Index: " + response.wind.speed);
      $(addWindIndex).appendTo(addHumidity);
      console.log(addWindIndex)




      //UV Index Query & setting up color indication changes.

      var cityLat = response.coord.lat;
      var cityLon = response.coord.lon;

      var UVIndex = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;

      $.ajax({
        url: UVIndex,
        method: "GET"
      }).then(function (index) {

        var uvColor = $("<span>" + index.value + "</span>");

        $(addUV).text("UV Index: ");
        $(addUV).append(uvColor);
        $(addUV).appendTo(addWindIndex);

        console.log(index.value);
        console.log(uvColor)
        console.log(addUV)

        if (index.value < 3) {

          $(uvColor).addClass("uvLow");

        } else if (index.value >= 3 && index.value <= 7) {

          $(uvColor).addClass("uvMod");

        } else if (index.value > 7) {

          $(uvColor).addClass("uvHigh");

        }


      });


    });


    var fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=imperial&appid=" + APIKey;

    console.log(fiveDayQuery)

    $.ajax({
      url: fiveDayQuery,
      method: "GET"
    }).then(function (days) {

      console.log(days)


      //5-day forecast that displays the date, an icon representation 
      // of weather conditions, the temperature, and the humidity
      var fiveDay1 = $("#fiveDay1");
      var fiveDay2 = $("#fiveDay2");
      var fiveDay3 = $("#fiveDay3");
      var fiveDay4 = $("#fiveDay4");
      var fiveDay5 = $("#fiveDay5");


      for (var i = 1; i < days.list.length - 1; i++) {


        var fiveDay = moment(days.list[i].dt_txt).format("MM/DD/YYYY")



        if (i == 2) {

          var nextDay = $("<p>");
          nextDay.text(fiveDay);
          nextDay.appendTo(fiveDay1);

          var icon1 = $("<img>");
          var weatherIcon = days.list[2].weather[0].icon;
          var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
          icon1.attr("src", iconURL);
          icon1.attr("class", "weatherImg2")
          $(icon1).appendTo(fiveDay1);
          console.log(icon1)

          var temp1 = $("<p>");
          (temp1).text("Temp: " + days.list[2].main.temp + " F");
          (temp1).appendTo(fiveDay1);

          var humidity1 = $("<p>");
          $(humidity1).text("Humidity: " + days.list[2].main.humidity + "%");
          (humidity1).appendTo(fiveDay1);

        } if (i == 10) {

          var nextDay = $("<p>");
          nextDay.text(fiveDay);
          nextDay.appendTo(fiveDay2);

          var icon1 = $("<img>");
          var weatherIcon = days.list[10].weather[0].icon;
          var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
          icon1.attr("src", iconURL);
          icon1.attr("class", "weatherImg2")
          $(icon1).appendTo(fiveDay2);
          console.log(icon1)

          var temp1 = $("<p>");
          (temp1).text("Temp: " + days.list[10].main.temp + " F");
          (temp1).appendTo(fiveDay2);

          var humidity1 = $("<p>");
          $(humidity1).text("Humidity: " + days.list[10].main.humidity + "%");
          (humidity1).appendTo(fiveDay2);

        }
        if (i == 18) {

          var nextDay = $("<p>");
          nextDay.text(fiveDay);
          nextDay.appendTo(fiveDay3);

          var icon1 = $("<img>");
          var weatherIcon = days.list[18].weather[0].icon;
          var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
          icon1.attr("src", iconURL);
          icon1.attr("class", "weatherImg2")
          $(icon1).appendTo(fiveDay3);
          console.log(icon1)

          var temp1 = $("<p>");
          (temp1).text("Temp: " + days.list[18].main.temp + " F");
          (temp1).appendTo(fiveDay3);

          var humidity1 = $("<p>");
          $(humidity1).text("Humidity: " + days.list[18].main.humidity + "%");
          (humidity1).appendTo(fiveDay3);

        }
        if (i == 26) {

          var nextDay = $("<p>");
          nextDay.text(fiveDay);
          nextDay.appendTo(fiveDay4);

          var icon1 = $("<img>");
          var weatherIcon = days.list[26].weather[0].icon;
          var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
          icon1.attr("src", iconURL);
          icon1.attr("class", "weatherImg2")
          $(icon1).appendTo(fiveDay4);
          console.log(icon1)

          var temp1 = $("<p>");
          (temp1).text("Temp: " + days.list[26].main.temp + " F");
          (temp1).appendTo(fiveDay4);

          var humidity1 = $("<p>");
          $(humidity1).text("Humidity: " + days.list[26].main.humidity + "%");
          (humidity1).appendTo(fiveDay4);

        } if (i == 34) {

          var nextDay = $("<p>");
          nextDay.text(fiveDay);
          nextDay.appendTo(fiveDay5);

          var icon1 = $("<img>");
          var weatherIcon = days.list[34].weather[0].icon;
          var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
          icon1.attr("src", iconURL);
          icon1.attr("class", "weatherImg2")
          $(icon1).appendTo(fiveDay5);
          console.log(icon1)

          var temp1 = $("<p>");
          (temp1).text("Temp: " + days.list[34].main.temp + " F");
          (temp1).appendTo(fiveDay5);

          var humidity1 = $("<p>");
          $(humidity1).text("Humidity: " + days.list[34].main.humidity + "%");
          (humidity1).appendTo(fiveDay5);

        }

        //search()
        // if the value is not equal to -1, then that means that value exists
        //create p tags for those value that match


      }


    });



    prevSearchedCities()

  });



//set up local history
var prevSearched = JSON.parse(localStorage.getItem("prevSearched")) || [];

function prevSearchedCities() {

  var searchCity = $("#searchCity").val();

  var logCity = {
    city: searchCity
  }

  prevSearched.push(logCity)
  //searchedCities.push(searchCity);

  console.log(logCity)

  for (var i = 0; i < prevSearched.length; i++) {

    var cityListEl = $("<ul>");
    var cityEl = $("<button>");
    $(cityEl).attr("class", "btn");

    $(cityEl).text(searchCity);
    $(cityListEl).appendTo(searchResults);
    $(cityEl).appendTo(cityListEl);


    if (i !== prevSearched.length) {

      logCity.empty()

    }

    

  }

  // $(cityEl).on("click", function (event) {

  //   event.preventDefault()
  
  //   createSearch() 
     
  // });

}

// var cityEl = $("<button>");





