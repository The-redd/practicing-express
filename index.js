const express = require('express')
const morgan = require('morgan')

const app = express()

function logger(req, res, next){
    console.log(`Hey! Im a logger and ${req.protocol}://${req.get('host')}/${req.originalUrl}`)
    next()
}

//Settings
app.set('appName', 'Express Tutorial')
app.set('port', 4500)

//Setting for ejs template
app.set('view engine', 'ejs')

//Middlewaress
app.use(express.json())
app.use(morgan('dev'))

/* app.get('/', (req, res) => {
    res.send("Hey, you have requested home!")
}) */

app.get('/', (req, res) => {
    const data = [{name: "freddy"}, {name: "Melissa"}, {name: "toro"}]
    res.render('index.ejs', {people: data})
})

app.get('/user', (req, res) => {
    res.json({
        name: "freddy",
        age: 33,
        job: "developer"
    })
})

app.post('/user/:id', (req, res) => {
    //console.log(req.body)
    //console.log(req.params)
    res.send("post request received")
})

app.put('/contact', (req, res) => {
    res.send("put request")
})

app.delete('/user/:userId', (req, res) => {
    res.send(`user ${req.params.userId} deleted`)
})

app.use(express.static('public'))

app.listen(app.get('port'), () =>{
    console.log(app.get('appName'))
    console.log(`Server on port ${app.get('port')}`)
})