const url ='https://puzzle.mead.io/puzzle'

const forcostURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/!.json?access_token=pk.eyJ1IjoidmluZWV0dGlqYXJlIiwiYSI6ImNsYmRjaDVtNzAwMDQzdW84bGEzOHp4ZzUifQ.BJvpvnhWvAqflBGLDcP0RA&limit=1`

// fetch(url).then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch(forcostURL).then(response => {
//     response.json().then(data => {
//         console.log(data.features[0].place_name)
//     }).catch(error => console.log(error) )
// }).catch(error => console.log(error))


fetch('http://localhost:3000/weather?address=boston').then(response => response.json()).then(data=>{
    if(data.error){
        console.log(data.error)
    }
    else{
        console.log(data.location)
        console.log(data.forecast)
    }
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent ='From JS'

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then(response => response.json()).then(data=>{
    if(data.error){
        messageOne.textContent = data.error
    }
    else{
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    }
})

})