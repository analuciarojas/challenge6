var currentDay=document.querySelector("#currentDay");
var date=document.querySelector("#date");
var date1=document.querySelector("#date1");
var date2=document.querySelector("#date2");
var date3=document.querySelector("#date3");
var date4=document.querySelector("#date4");
var date5=document.querySelector("#date5");
var cityArray = [];
var cityList =$("#city-list");
var line=$("#hr");
var key = "045a878e40a6f6119f71f789e2cb5082";
var cityname=$("#currentCity");
var block=document.querySelector("#block");


block.style.display = "none";


setInterval(function () {
    currentDay.innerHTML = moment().format(
       "dddd, MMM Do, h:mm:ss a"
     );
   },1000);

function saveCity(){
    localStorage.setItem("cities", JSON.stringify(cityArray));
}

function dates(){
    date.innerHTML = moment().format('L');
    date1.innerHTML =moment().add(1, 'days').format('L');
    date2.innerHTML =moment().add(2, 'days').format('L');
    date3.innerHTML =moment().add(3, 'days').format('L');
    date4.innerHTML =moment().add(4, 'days').format('L');
    date5.innerHTML =moment().add(5, 'days').format('L');
}

function displayCity(){
    cityList.empty();
    
    for (var i = 0; i < cityArray.length; i++) {
      var city = cityArray[i];
      
      var button = $("<button>").text(city);
      button.attr("class", "list-group-item", "list-group-item active");
      button.attr("aria-current", "true");
      cityList.prepend(button);
    }
    
}

function cityName(c){
    cityname.text(c);
}


function getWeather(cityname){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityname+ "&appid=" + key; 

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        var getCurrentWeatherIcon = response.weather[0].icon;
        var displayCurrentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + "@2x.png />");



    })


}

$("#city").on("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#search-city").click();
    }
  });

 $("#search-city").on("click", function(){
    block.style.display = "block";

    var hr = document.createElement("HR");
    var city = $("#city").val().trim();

    if(cityArray.length===0){
        var hr = $("<hr>");
        line.prepend(hr);
    }
    if (city !== "") {
        cityArray.push(city);
    }
    dates();
    cityName(city);
    saveCity();
    displayCity();
    getWeather(city);
});