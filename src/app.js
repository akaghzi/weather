const express = require('express')
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 8989

const getlonglat = require("./utils/getlonglat");
const getweather = require("./utils/getweather");

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    // console.log(req)
    res.render('index', {
        title: 'Weather Application',
        name: "weather-app",
        language: 'javascript',
        writer: 'Asim Kaghzi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        writer: "Asim Kaghzi",
        language: 'javascript'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        writer: "Asim Kaghzi",
        message: 'Read the manual after everything else has failed.'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            title: 'Your weather',
            message: 'No address provided',
        })
    }
    let address = req.query.address
    let units = 'm'
    getlonglat(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log(error)
            return res.send({
                message: 'Location not found',
                writer: 'Asim Kaghzi'
            })
        } else {
            getweather(latitude, longitude, units, (error, {current}) => {
                if (error) {
                    console.log('Error: ' + error)
                }

                return res.send({
                    location: location,
                    temperature: current.temperature,
                    feelsLike: current.feelslike,
                    humidity: current.humidity,
                    writer: 'Asim Kaghzi'
                })
            });
        }
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oops ...',
        message: 'Help article not found, we have logged the error and will fix it as soon as we can',
        writer: 'Asim Kaghzi'
    })
})

// should be the last route
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oops ...',
        message: 'Page you are looking for is not available at this, we have logged the error and will fix it as soon as we can',
        writer: 'Asim Kaghzi'
    })
})

app.listen(port, () => {
    console.log('server started on port $port')
})
