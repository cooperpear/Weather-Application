// https://stackoverflow.com/questions/29133664/how-do-i-add-multiple-objects-of-a-similar-type-to-local-storage

var searchhistory = localStorage.getItem("names")

// $("#search-history").append(searchhistory);
var cityNames = [];

$("#search-button").on("click", function () {
  var cityvalue = $("#city-input").val().trim()


  var names = {
    id: cityNames.length,
    city: cityvalue
  }

  cityNames.push(names);

  //use an array to store multiple city names. use this outside of button function?
  localStorage.setItem("names", JSON.stringify(cityNames));

  $("#search-history").html(searchhistory);

  var APIKey = "d06517398e8aaaadf62b3b9e18d611c1";
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${APIKey}&units=imperial`;
  var callcity5day = `https://api.openweathermap.org/data/2.5/forecast?q=${cityvalue}&appid=${APIKey}&units=imperial`;

  //make our ajax call for 5 day forecast
  $.ajax({
    url: callcity5day,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
      //empty our storage at id positions when new citys are searched
      $("#day1").empty();
      $("#day2").empty();
      $("#day3").empty();
      $("#day4").empty();
      $("#day5").empty();


      // here we cycle through our object array in search of hours with value of "00:00:00"
      var j = 1;
      for (let i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt.indexOf("00:00:00") !== -1) {
          $(`#day${j}`).append(`<h6> Date: ${response.list[i].dt_txt} </h6><h6> Temp: ${response.list[i].main.temp} </h6> <h6> Humdity: ${response.list[i].main.humidity}`)
          j = j + 1;
        }
      }
    });

  //make our ajax request for current day forecase
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      console.log(response)
      $("#current-weather").empty();

      $("#current-weather").append(`<p> City Name: ${cityvalue}</p>
                                  <p> Wind Speed: ${response.wind.speed}</p>
                                  <p> Humidity: ${response.main.humidity}</p>
                                  <p> Temperature: ${response.main.temp}</p>`)

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });
});


console.log(searchhistory);

