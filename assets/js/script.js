var currentDay=document.querySelector("#currentDay");
var date1=document.querySelector("#date1");
var date2=document.querySelector("#date2");
var date3=document.querySelector("#date3");
var date4=document.querySelector("#date4");
var date5=document.querySelector("#date5");
var cityArray = [];
var cityList =$("#city-list");
var line=$("#hr");
var key = "f193accace7604fc0fa8203f8ac5955d";
var Cityn=$("#currentCity");
var dayTemp=$("#dayTemp");
var dayHum=$("#dayHum");
var dayWind=$("#dayWind");
var dayUV=$("#dayUV");
var listClick=document.querySelectorAll(".list-group-item");
var block=document.querySelector("#block");


block.style.display = "none";


setInterval(function () {
    currentDay.innerHTML = moment().format(
       "dddd, MMM Do, h:mm:ss a"
     );
   },1000);

function saveCity(city){
    if (city !== "") {
        cityArray.push(city);
    }
    localStorage.setItem("cities", JSON.stringify(cityArray));
    displayCity();
}

function dates(){
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
      button.attr("id", city);
      button.attr("aria-current", "true");
      cityList.prepend(button);
    }
    
}

function getWeather(cityname){
    var URL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityname+ "&appid=" + key; 

    
    $.ajax({
      url: URL,
      method: "GET"
    }).then(function(response) {

        var iconid=response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconid + ".png";
        $('#wicon').attr('src', iconurl);
        Cityn.text(response.name + "  (" + (moment().format('L'))+ ")  ");
        dayTemp.text("Temperature: "+(parseInt((response.main.temp)* 9/5 - 459))+" °F");
        dayHum.text("Humidity: "+ response.main.humidity + " %");
        dayWind.text("Wind: "+ response.wind.speed + " MPH");
        var CoordLon = response.coord.lon;
        var CoordLat = response.coord.lat;

    var URL2 = "https://api.openweathermap.org/data/2.5/uvi?appid="+ key+ "&lat=" + CoordLat +"&lon=" + CoordLon;
    $.ajax({
        url: URL2,
        method: "GET"
    }).then(function(responseuv) {
        dayUV.text("UV Index: "+ responseuv.value );

        if(responseuv.value > 0 && responseuv.value <=2){
            dayUV.attr("class","green")
        }
        else if (responseuv.value > 2 && responseuv.value <= 5){
            dayUV.attr("class","yellow")
        }
        else if (responseuv.value >5 && responseuv.value <= 7){
            dayUV.attr("class","orange")
        }
        else if (responseuv.value >7 && responseuv.value <= 10){
            dayUV.attr("class","red")
        }
        else{
            dayUV.attr("class","purple")
        }
        
    });

    var name=response.name;

    if(cityArray.length===0){
        saveCity(name);
    }

    for(i=0;i<((cityArray.length)+1);i++){
        console.log(cityArray[i],name);
        console.log(i,cityArray.length);


        if(name===cityArray[i]){
            var yes=1;
        }
    }

    if(yes!==1){
        saveCity(name);
    }

})

var URL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + key;
            $.ajax({
            url: URL3,
            method: "GET"
        }).then(function(response3) { 

            for(i=0;i<5;i++)
            {
                var iconid = response3.list[i].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconid + ".png";
                $("#icon"+(i+1)).attr('src', iconurl);
                $("#temp"+(i+1)).text("Temp: "+(parseInt((response3.list[i].main.temp)* 9/5 - 459))+"° F");
                $("#wind"+(i+1)).text("Wind: "+ response3.list[i].wind.speed + " MPH");
                $("#hum"+(i+1)).text("Humidity: "+ response3.list[i].main.humidity + " %");
            }
    });

}


$(document).on('click', '.list-group-item', function (event) {
    var city=event.target.id;
    getWeather(city);

});


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
    dates();
    getWeather(city);
});


