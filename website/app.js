//require('dotenv').config()
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// get your element on the page

const button = document.getElementById('generate')

// get the data back as an object

// store the information you want from the response into a new variable
// send that to the server

button.addEventListener('click', function(event) {

    const API = "d37ead94fdc7e472dfa0bfc189991efb"
    const city = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},can&APPID=${API}`).then(res => res.json())
        .then(posts => {
            const weatherArray = posts;
            let myFeelings = {
                    feelings: feelings,
                    weather: weatherArray.weather[0],
                    city: weatherArray.name,
                    temp: weatherArray.main

                }
                //console.log(myFeelings);
            const postData = async(url = '', data = {}) => {
                console.log(data);
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    //body: data type must match "Content-Type" header        
                    body: JSON.stringify(data),

                });

                try {
                    const newData = response.json();
                    console.log(newData);
                    return newData;
                } catch (error) {
                    console.log("error", error);
                }
            }

            postData('/addentry', { myFeelings })
        })

    // send that to the server

})