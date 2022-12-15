const path =  require('path')
const express = require('express')
const hbs  = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const PORT = process.env.PORT || 3000

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const  viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Vineet Tijare'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        img :'/img/cute-cartoon-robot.jpg',
        name:'Vineet Tijare'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        message: 'Please help me !!!',
        name:'Vineet Tijare'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather App!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'vineet',
//         age: 31 
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>About Page!<h2>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide correct address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
           if(error){
             return res.send({ error })
            }
        
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // console.log(req.query)
    // res.send({
    //     forcast: 'rain',
    //     location: 'pune',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
      return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

// app.get('/help/*',(req, res) => {
//     res.send('Help articles not found!!!')
// })

// app.get('*', (req, res) => {
//     res.send('Page not found')
// })

app.get('/help/*', (req, res) =>{
    res.render('error-page',{
        title:'Help articles not found!!!',
        name: 'Vineet Tijare '
    })
})

app.get('*', (req, res) =>{
    res.render('error-page',{
        title:'Page not found',
        name: 'Vineet Tijare '
    })
})


app.listen(PORT, () => {
    console.log('Server is running on PORT no', PORT)
})