const express = require('express')
const app = express()
const port = 3000
const host = '0.0.0.0'


app.listen(port, host, 511, () => {
  console.log(`Example app listening at http://${host}:${port}`)
})

app.get('/status', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(getStatus()))
})

app.get('/', (req, res) => {
    res.send("Hello World!")
})

getStatus = () => {
    let info = {
        1:true,
        2:false
    }
    return info
}