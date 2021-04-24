const path = require('path')
//express is actually a function not an object. express is used to create web servers 
const express = require('express')

//requiring for partials
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// we call to create a new express appl. app stores express appl
const app = express()

//Defined paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// to set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)


// to handle static pages from public folder
app.use(express.static(publicDirPath))

// to render handlebar templates across webpages
app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather',
        name: 'Preethi'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Me',
        name: 'Preethi'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help Page',
        name: 'Preethi',
        helpMsg : 'This is my help message to you'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
             error : "You must provide address location to find the weather!"
         })
     }

     geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send ({error})
            }

            res.send ({
                forecastData: forecastData,
                location,
                address: req.query.address
            })
        })
     })
    // res.send({
    //         forecast: 'It is snowing',
    //         location: 'Philadelphia',
    //         address : req.query.address
    // })
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error : "You must provide search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404Help',{
        title : '404 Help',
        txt: 'Help article not found',
        name:'Preethi'
    })
})
// 404 page handler to be done only at the last
app.get('*',(req,res)=>{
    res.render('404Common',{
        title: '404',
      txt:  'Page Not Found ',
      name:'Preethi'
    })
})

// starting the server. 3000 is local dev port number
app.listen(3000, ()=>{
    // console msg
    console.log('Server is up on port 3000')
})












// app.com imagine we own this domain 
//app.com/help
//app.com/about

//app.get is used to resource a specific url

// app.get('',(req,res)=>{
//      res.send('<h1> Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{ 
//         name:'Preethi'
//     },{
//         name: 'Ramesh'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1> Hello  Aboout page!</h1>')
// })
