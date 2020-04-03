var searchHistory = localStorage.getItem("city")

$("#search-history").append(searchHistory);

$("#search-button").on("click", function () {
  var cityvalue = $("#city-input").val().trim()
  localStorage.setItem("city", JSON.stringify(cityvalue));
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
      $("#currentweather").empty();
      $("#currentweather").append(`<h3> CityName: ${cityvalue}</h3><h3> WindSpeed: ${response.wind.speed}</h3><h3> Humidity: ${response.main.humidity}</h3><h3> Temperature: ${response.main.temp}</h3>`)





      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });




});




