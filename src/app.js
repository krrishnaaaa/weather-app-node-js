import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import hbs from 'hbs'
import weather from "./weather.js";

// Setting current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
console.log(__filename)

// Getting public directory path
const publicDirPath = path.join(path.dirname(__dirname), 'public')
const viewsPath = path.join(path.dirname(__dirname), 'templates/views')
const partialsPath = path.join(path.dirname(__dirname), 'templates/partials')
console.log(publicDirPath)
const app = express()
const port = process.env.PORT || 3000

// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup directory to serve static contents
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        subtitle: 'Weather forecasting app is here',
        author: 'Navkrishna'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the page',
        message: 'Node.js tutorial learning page',
        author: 'Navkrishna'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'For any help required, google for the solution..',
        author: 'Navkrishna'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help article not found..',
        author: 'Navkrishna'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address!!'
        })
        // return res.render('weather', {
        //     title: 'Weather Forecast',
        //     location: 'Error!',
        //     forecast: 'Address not provided!!',
        //     author: 'Navkrishna'
        // })
    }

    weather.displayWeatherDetails(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error
            })
            // return res.render('weather', {
            //     title: 'Weather Forecast',
            //     location: 'Error!',
            //     forecast: error,
            //     author: 'Navkrishna'
            // })
        }
        if (response) {
            return res.send({
                location: response.location,
                forecast: response.forecast,
                icon: response.icon
            })
            // return res.render('weather', {
            //     title: 'Weather Forecast',
            //     location: response.location,
            //     forecast: response.forecast,
            //     author: 'Navkrishna'
            // })
        }
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Page not found..',
        author: 'Navkrishna'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})