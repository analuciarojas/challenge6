var currentDay=document.querySelector("#currentDay");
var cityArray = [];
var cityList =$("#city-list");
var line=$("#hr");


setInterval(function () {
    currentDay.innerHTML = moment().format(
       "dddd, MMM Do, h:mm:ss a"
     );
   },1000);

function saveCity(){
    localStorage.setItem("cities", JSON.stringify(cityArray));
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

 $("#search-city").on("click", function(){
    var hr = document.createElement("HR");
    var city = $("#city").val().trim();

    if(cityArray.length===0){
        var hr = $("<hr>");
        line.prepend(hr);
    }
    if (city !== "") {
        cityArray.push(city);
    }
    saveCity();
    displayCity();
});