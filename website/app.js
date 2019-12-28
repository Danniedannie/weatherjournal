require('dotenv').config()
    /* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d37ead94fdc7e472dfa0bfc189991efb

console.log(process.env.API_KEY);

// get your element on the page

// const location = ...

const query = `api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API_KEY}`

// fetch()
// get the data back as an object

// store the information you want from the response into a new variable

// const myFeelings = {
// ... the weather
// ... your feelings
// }

// send that to the server..