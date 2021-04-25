//connecting hbs with the js
const weatherForm = document.querySelector('form')
//value extracted from form which the user enters on the screen
const search= document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo  = document.querySelector('#message-2')
//messageOne.textContent = 'From JS'


// to listen to the underlying code on submission of the form
weatherForm.addEventListener('submit', (e) => {

    //doesnot prevent the page to refresh when submit is clicked
    e.preventDefault()

    //value is whatever is typed in 
    const location = search.value

    const url= '/weather?address=' + location

    messageOne.textContent =' Loading ... '
    messageTwo.textContent  = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = ''
           messageOne.textContent = data.error
            } else {
               messageOne.textContent = data.location
               messageTwo.textContent =  data.forecastData
            }
        })
    })
})