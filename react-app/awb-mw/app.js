const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/status', (req, res) => res.json({success: true}))

app.post('/delivery/v1/orders', (req, res) => {
    console.log("New order: " + JSON.stringify(req.body));
    res.json({success: true})
});

app.listen(3001, () => console.log('Example app listening on port 3001!'))
