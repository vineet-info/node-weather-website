const request = require('request')

const forecast = (latitude,longitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=14d03834e7a3126dd4429a5792470a54&query=${latitude},${longitude}.4233&units=f`
    request({url: url, json: true},(error, { body } = {}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out. It feels like ${body.current.feelslike} degree out. `)
        }
    })
}

module.exports = forecast