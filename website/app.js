//require('dotenv').config()
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// get your element on the page

//const button = document.getElementById('generate')

// get the data back as an object

// store the information you want from the response into a new variable
// send that to the server

// send that to the server

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
let apiKey = 'can&APPID=d37ead94fdc7e472dfa0bfc189991efb';
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const feelings = document.getElementById('feelings').value;
    const city = document.getElementById('zip').value + ",";
    getWeather(baseURL, city, apiKey)

    .then(function(data) {
        //add data to POST request
        postData('/addentry', { weather: data.weather, weatherInformation: data.main, cityName: data.name, feelings: feelings });
    });

};

const getWeather = async(baseURL, city, key) => {

    const res = await fetch(baseURL + city + apiKey)
    try {

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //body: data type must match "Content-Type" header
        body: JSON.stringify(data),

    });
    //      try {
    //          const newData = data;
    //          console.log(newData);
    //          return newData;
    //      } catch (error) {
    //          console.log("error", error);
    //      }
}