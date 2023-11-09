const searchButton = document.querySelector("#searchButton")
const weatherEl = document.querySelector("#currentWeather")
const dayOne = document.querySelector("#day-1");
const dayTwo = document.querySelector("#day-2");
const dayThree = document.querySelector("#day-3");
const dayFour = document.querySelector("#day-4");
const dayFive = document.querySelector("#day-5");
const savedCityZero = document.querySelector('#b0');
const savedCityOne = document.querySelector('#b1');
const savedCityTwo = document.querySelector('#b2');
const savedCityThree = document.querySelector('#b3');
const savedCityFour = document.querySelector('#b4');
let zipCodeEl = $(".textarea");
let zipCode = "";
let lat = "";
let lon = "";
let temp = "";
let wind = "";
let humidity = "";
let city = "";
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let currentDate = `${month}/${day}/${year}`;
let storedCities = [];
let storedTemps = [];
let storedWinds = [];
let storedHumids = [];
let storedDates = [];
const locationKey = 'a1d8801b155299ee41aad93b310ed9f2';
const weatherKey = 'd236208c1246d8f26f34c109644f9d1a';

searchButton.addEventListener("click", getLocationAPI);

function getLocationAPI() {
  if(zipCodeEl.val() !== null) {
    zipCode = zipCodeEl.val()
  };

  let requestLocation = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${locationKey}`;
    fetch(requestLocation)
      .then(function (response) {
        return response.json();
// this bracket closes line 37
      })
      .then(function (data) {
        console.log(data);
        lat = data.lat;
        lon = data.lon;
        console.log(lat);
        console.log(lon);
        getWeatherAPI(lat,lon);
// This bracket closes line 42  
      });
// This bracket closes the function
  };


// Linked Weather API and pulled the weather data using lat, lon from getLocationApi
function getWeatherAPI(lat,lon) {
  let requestWeather = `htpps://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherKey}`;
    fetch(requestWeather)
    .then(function (response) {
      return response.json();
// this bracket closes line 66
    })
    .then(function (data) {
      console.log(data);

// CURRENT WEATHER CODE
// redefining the variables for the weather with info from the API
  city = data.city.name;
    console.log(city);
// currentDate doesn't need to be redefined since its date will always be the current day
    console.log(currentDate);
//setting weather values
  
    temp = data.list[0].main.temp;
    console.log(temp);
  wind = data.list[0].wind.speed;
    console.log(wind);
  humidity = data.list[0].main.humidity;
    console.log(humidity);
// reading the city name and rendering the city and date to the page
  let localCityDate = document.createElement('h2');
      localCityDate.textContent = 'The weather for ' + city + ' on ' + currentDate;
      weatherEl.appendChild(localCityDate);
// creating an unordered list for temp, wind, and humidity
  let listEl = document.createElement("ul");
  let tempLi = document.createElement("li");
  let windLi = document.createElement("li");
  let humidLi = document.createElement("li");
// rendering the unordered list element to the page
    weatherEl.appendChild(listEl);
// assigning the text content to each line item
    tempLi.textContent = 'Temperature: ' + temp + '\u00B0 F';
    windLi.textContent = 'Wind Speed: ' + wind + ' MPH';
    humidLi.textContent = 'Humidity: ' + humidity + '%';
// rendering the line items to the list element for current weather
    listEl.appendChild(tempLi);
    listEl.appendChild(windLi);
    listEl.appendChild(humidLi);
// setting info from current weather
  function setCityCurrent() {
    let currentCity = city;
    let cityDate= currentDate;
    let cityTemp = temp;
    let cityWind = wind;
    let cityHumid = humidity;
      if (storedCities !== null && storedDates !== null && storedTemps !== null && storedWinds !== null && storedHumids !== null) {
        storedCities.push(currentCity);
        storedDates.push(cityDate);
        storedTemps.push(cityTemp);
        storedWinds.push(cityWind);
        storedHumids.push(cityHumid);
        localStorage.setItem("storedCities", JSON.stringify(storedCities));
        localStorage.setItem("storedDates", JSON.stringify(storedDates));
        localStorage.setItem("storedTemps", JSON.stringify(storedTemps));
        localStorage.setItem("storedWinds", JSON.stringify(storedWinds));
        localStorage.setItem("storedHumids", JSON.stringify(storedHumids));
      } else {
        storedCities = currentCity.attr(data.city.name);
        storedDates = cityDate.attr(currentDate);
        storedTemps = cityTemp.attr(data.list[0].main.temp);
        storedWinds = cityWind.attr(data.list[0].wind.speed);
        storedHumids = cityHumid.attr(data.list[0].main.humidity)
        localStorage.setItem("storedCities", JSON.stringify(storedCities));
        localStorage.setItem("storedDates", JSON.stringify(storedDates));
        localStorage.setItem("storedTemps", JSON.stringify(storedTemps));
        localStorage.setItem("storedWinds", JSON.stringify(storedWinds));
        localStorage.setItem("storedHumids", JSON.stringify(storedHumids));
      }
// this bracket closes setCity()
    };
setCityCurrent();
// getting the cities saved to local storage
    function getCityCurrent() {
      if (JSON.parse(localStorage.getItem("storedCities")) !== null) {
        storedCities = JSON.parse(localStorage.getItem("storedCities"));
// adding the city name to the button
          savedCityZero.textContent = storedCities[0];
          savedCityOne.textContent = storedCities[1];
          savedCityTwo.textContent = storedCities[2];
          savedCityThree.textContent = storedCities[3];
          savedCityFour.textContent = storedCities[4];
// this bracket closes the if/else statement            
      }
// this bracket closes getCity()
    }
getCityCurrent();

// FIVE DAY FORECAST
// DAY ONE
// Assigning unique variables for day 1
  let dayOneDate = document.createElement('h2');
  let dayOneList = document.createElement('ul');
  let dayOneTemp = document.createElement('li');
  let dayOneWind = document.createElement('li');
  let dayOneHumid = document.createElement('li');
// Redefining the weather variables
    let futureDate1 = data.list[4].dt_txt;
    temp = data.list[4].main.temp;
    wind = data.list[4].wind.speed;
    humidity = data.list[4].main.humidity
// Assigning the text content of dayOneDate  
      dayOneDate.textContent = futureDate1;
// Rednering the date and the list element to the page
        dayOne.appendChild(dayOneDate);
        dayOne.appendChild(dayOneList);
// Assigning the text content for the weather variables
      dayOneTemp.textContent = 'Temp: ' + temp + '\u00B0 F';
      dayOneWind.textContent = 'Wind: ' + wind + 'MPH';
      dayOneHumid.textContent = 'Humidity:' + humidity + '%';
// Rendering the information to the list in the Day One box
        dayOneList.appendChild(dayOneTemp);
        dayOneList.appendChild(dayOneWind);
        dayOneList.appendChild(dayOneHumid);        
// DAY TWO
// Assigning unique variables for day 2
  let dayTwoDate = document.createElement('h3');
  let dayTwoList = document.createElement('ul');
  let dayTwoTemp = document.createElement('li');
  let dayTwoWind = document.createElement('li');
  let dayTwoHumid = document.createElement('li');
// Redefining the weather variables
    let futureDate2 = data.list[12].dt_txt;
    temp = data.list[12].main.temp;
    wind = data.list[12].wind.speed;
    humidity = data.list[12].main.humidity
// Assigning the text content of dayOneDate 
      dayTwoDate.textContent = futureDate2;
// Rendering the date and the list element to the page
        dayTwo.appendChild(dayTwoDate);
        dayTwo.appendChild(dayTwoList);
// Assigning the text content for the weather variables
      dayTwoTemp.textContent = 'Temp: ' + temp + '\u00B0 F';
      dayTwoWind.textContent = 'Wind: ' + wind + 'MPH';
      dayTwoHumid.textContent = 'Humidity:' + humidity + '%';
// Rendering the information to the list in the Day One box
        dayTwoList.appendChild(dayTwoTemp);
        dayTwoList.appendChild(dayTwoWind);
        dayTwoList.appendChild(dayTwoHumid);
// DAY THREE
// Assigning the unique variables for Day 3
  let dayThreeDate = document.createElement('h3');
  let dayThreeList = document.createElement('ul');
  let dayThreeTemp = document.createElement('li');
  let dayThreeWind = document.createElement('li');
  let dayThreeHumid = document.createElement('li');
// Redefining the weather variables
    let futureDate3 = data.list[18].dt_txt;
    temp = data.list[18].main.temp;
    wind = data.list[18].wind.speed;
    humidity = data.list[18].main.humidity
// Assigning the results from the variable be assigned to dayThreeDate
      dayThreeDate.textContent = futureDate3;
// Rendering the date and list element to the page
      dayThree.appendChild(dayThreeDate);
      dayThree.appendChild(dayThreeList);
// Filling in the text content from the data
      dayThreeTemp.textContent = 'Temp: ' + temp + '\u00B0 F';
      dayThreeWind.textContent = 'Wind: ' + wind + 'MPH';
      dayThreeHumid.textContent = 'Humidity:' + humidity + '%';
// Rendering the results to the page
      dayThreeList.appendChild(dayThreeTemp);
      dayThreeList.appendChild(dayThreeWind);
      dayThreeList.appendChild(dayThreeHumid);      
// DAY FOUR
// unique variables
  let dayFourDate = document.createElement('h3');
  let dayFourList = document.createElement('ul');
  let dayFourTemp = document.createElement('li');
  let dayFourWind = document.createElement('li');
  let dayFourHumid = document.createElement('li');
// redefinitions
    let futureDate4 = data.list[25].dt_txt;
    temp = data.list[25].main.temp;
    wind = data.list[25].wind.speed;
    humidity = data.list[25].main.humidity
// assigning text content for the date
    dayFourDate.textContent = futureDate4;
// rendering date and list
      dayFour.appendChild(dayFourDate);
      dayFour.appendChild(dayFourList);
// assigning texr content for the variables
    dayFourTemp.textContent = 'Temp: ' + temp + '\u00B0 F';
    dayFourWind.textContent = 'Wind: ' + wind + 'MPH';
    dayFourHumid.textContent = 'Humidity:' + humidity + '%';
// rendering the results
      dayFourList.appendChild(dayFourTemp);
      dayFourList.appendChild(dayFourWind);
      dayFourList.appendChild(dayFourHumid);
// DAY FIVE
// assigning unique variables
  let dayFiveDate = document.createElement('h3');
  let dayFiveList = document.createElement('ul');
  let dayFiveTemp = document.createElement('li');
  let dayFiveWind = document.createElement('li');
  let dayFiveHumid = document.createElement('li');
// reassigning weather variables
    let futureDate5 = data.list[33].dt_txt;
    temp = data.list[33].main.temp;
    wind = data.list[33].wind.speed;
    humidity = data.list[33].main.humidity
// assigning date from API
      dayFiveDate.textContent = futureDate5;
// appending the date and list to day five
      dayFive.appendChild(dayFiveDate);
      dayFive.appendChild(dayFiveList);
// assigning variables from API
    dayFiveTemp.textContent = 'Temp: ' + temp + '\u00B0 F';
    dayFiveWind.textContent = 'Wind: ' + wind + 'MPH';
    dayFiveHumid.textContent = 'Humidity:' + humidity + '%';
//apending the weather information to the page
      dayFiveList.appendChild(dayFiveTemp);
      dayFiveList.appendChild(dayFiveWind);
      dayFiveList.appendChild(dayFiveHumid);
  function resetFunction(event) {

  }
// This bracket and parentheses closes line 69
  });
  return;
// This bracket closes the function
};