//require('dotenv').config()
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d37ead94fdc7e472dfa0bfc189991efb

//console.log(process.env.API_KEY);

// get your element on the page

// const location = ...


const button = document.getElementById('generate')

button.addEventListener('click', function(event) {

    const city = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const API = "d37ead94fdc7e472dfa0bfc189991efb"
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},can&APPID=${API}`).then(res => res.json())
        .then(posts => {
            const weatherArray = posts;
            const forecast = {
                weather: weatherArray.weather[0],
                city: weatherArray.name,
                temp: weatherArray.main

            }


            console.log(forecast);
            console.log(feelings);



        })
});



// get the data back as an object

// store the information you want from the response into a new variable

// const myFeelings = {
// ... the weather
// ... your feelings
// }

/* send that to the server */