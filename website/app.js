const BASEURL = 'http://api.openweathermap.org/data/2.5/weather?q='
const APIKEY = 'can&APPID=d37ead94fdc7e472dfa0bfc189991efb';

class WeatherJournal {
    constructor(feelings, city, author, generateButton, dateOutput, tempOutput, contentOutput, cityOutput) {
        this.feelings = feelings;
        this.city = city;
        this.author = author;
        this.d = new Date();
        this.newDate = this.d.getMonth() + '.' + this.d.getDate() + '.' + this.d.getFullYear();
        this.generateButton = generateButton;
        this.BASEURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
        this.APIKEY = 'can&APPID=d37ead94fdc7e472dfa0bfc189991efb';
        this.dateOutput = dateOutput;
        this.tempOutput = tempOutput;
        this.contentOutput = contentOutput;
        this.cityOutput = cityOutput;

        this.generateButton.addEventListener('click',
            this.performAction.bind(this))
    }

    async performAction() {
        const inputValue = this.city.value + ",";
        const data = await this.getWeather(this.BASEURL, inputValue, this.APIKEY);
        const { weather, main, name: cityName } = data;
        const response = await this.postData('/addentry', {
            weather,
            weatherInformation: main,
            cityName,
            feelings: this.feelings.value,
            date: this.newDate,
            author
        });

        await this.updateUI();
    }

    async getWeather(baseUrl, cityValue, apiKey) {
        // getWeather = async () => {
        try {
            const res = await fetch(baseUrl + cityValue + apiKey)
            const data = await res.json();
            return data;
        } catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    }

    async postData(url = '/addentry', data = {}) {
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

    async updateUI() {
        const request = await fetch('/all')
        try {
            let allData = await request.json();
            this.contentOutput.innerHTML = allData.test.feelings;
            this.tempOutput.innerHTML = allData.test.weather[0].main;
            this.dateOutput.innerHTML = allData.test.date;
            this.cityOutput.innerHTML = allData.test.cityName;
            console.log(this.contentOutput, this.cityOutput);
            console.log(allData);
        } catch (error) {
            console.log("error", error);
        }
    }
}

const feelings = document.getElementById('feelings');
const city = document.getElementById('zip');
const author = "test";
const generateButton = document.getElementById('generate');
const dateOutput = document.getElementById('date');
const tempOutput = document.getElementById('temp');
const contentOutput = document.getElementById('content')
const cityOutput = document.getElementById('city');


const myJournal = new WeatherJournal(feelings, city, author, generateButton, dateOutput, tempOutput, contentOutput, cityOutput);
//myJournal.performAction();

async function performAction() {
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    const feelings = document.getElementById('feelings').value;
    const author = "test";
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

    await updateUI();

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
    const request = await fetch('/all')
    try {
        let allData = await request.json();
        const date = document.getElementById('date').innerHTML = allData.test.date;
        const temp = document.getElementById('temp').innerHTML = allData.test.weather[0].main;
        const content = document.getElementById('content').innerHTML = allData.test.feelings;
        const city = document.getElementById('city').innerHTML = allData.test.cityName;
    } catch (error) {
        console.log("error", error);
    }
}