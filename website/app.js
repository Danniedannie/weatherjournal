//require('dotenv').config()
/* Global Variables */

// Create a new date instance dynamically with JS

// get your element on the page

//const button = document.getElementById('generate')

// get the data back as an object

// store the information you want from the response into a new variable
// send that to the server

// send that to the server

const BASEURL = 'http://api.openweathermap.org/data/2.5/weather?q='
const APIKEY = 'can&APPID=d37ead94fdc7e472dfa0bfc189991efb';

document.getElementById('generate').addEventListener('click', performAction);

async function performAction() {
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    const feelings = document.getElementById('feelings').value;
    const author = document.getElementById('author').value;
    const city = document.getElementById('zip').value + ",";

    const data = await getWeather(BASEURL, city, APIKEY);
    const { weather, main, name: cityName } = data;
    const response = await postData('/addentry', {
        weather,
        weatherInformation: main,
        cityName,
        feelings,
        date: newDate,
        author
    });

    console.log(response)

    const updatedUI = await updateUI();

};


const getWeather = async(BASEURL, city, key) => {
    try {
        const res = await fetch(BASEURL + city + APIKEY)

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


const postData = async(url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            //body: data type must match "Content-Type" header
            body: JSON.stringify(data),
        })
        return response;
    } catch (error) {
        console.log("error", error);
    }

}

const updateUI = async() => {
    const request = await fetch('/all');
    try {
        let allData = await request.json();
        console.log(allData);
        const date = document.getElementById('date').innerHTML = allData.Danielle.date;
        const temp = document.getElementById('temp').innerHTML = allData.Danielle.weather[0].main;
        const content = document.getElementById('content').innerHTML = allData.Danielle.feelings;
        // console.log(allData);
    } catch (error) {
        console.log("error", error);
    }
}