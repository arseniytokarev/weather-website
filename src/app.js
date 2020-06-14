const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arseniy', 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Arseniy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Arseniy'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to add an address'
        })
    }
    geocode(req.query.address, (error, {longitude,latitude,location} = {}) => {
        if (error) {
            return console.log(error), res.send({error: 'Error occurred'})
        } else {
            // console.log(chalk.green('Location:', location))
            // console.log(longitude, latitude)

            forecast(longitude, latitude, location, (error, data) => {
                if (error) {
                    return console.log(error), res.send({error: 'Unable to find location. Try again'})
                } else {
                    console.log('Success')
                    return res.send({
                        location,
                        iconsrc: data.icon,
                        forecast: `${data.weather_descriptions}. It is currently 
                        ${data.temperature} °C, feels 
                        like ${data.feels_like}°C degrees. The humidity is ${data.humidity}%.`
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 Page Not Found :('
    })
})


app.listen(port, () => console.log('Server is running on ' + port))

