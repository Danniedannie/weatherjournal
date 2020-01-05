const projectData = {};

const express = require('express')
const app = express()
    //GET homepage
app.get('/', function(req, res) {
        res.sendFile(__dirname + '/website/index.html');
    })
    /* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;

// Callback to debug
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);

};

app.get('/all', getData)

function getData(req, res) {
    res.send(projectData)
    console.log(projectData)
}

//POST ROUTE

app.post('/addentry', addEntry)

function addEntry(req, res) {
    //console.log(req.body);
    const { weather, cityName, weatherInformation, feelings, date, author } = req.body
    newEntry = {
        weather,
        weatherInformation,
        cityName,
        feelings,
        date,
        author
    }
    projectData[author] = newEntry
        // console.log(projectData)
    res.send('success')
}


app.listen(3000, listening)