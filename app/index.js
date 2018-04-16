const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/Public'));

const gpioManager = require('./gpioManager');

app.get('/', (req, res) => {
  res.send("Success!");
});

app.post('/', (req, res) => {
  const appId = req.body.appId;
  res.json({
    message: "Successfully Connected",
    code: appId,
    result: 0
  });
});

app.post('/pin', (req, res) => {
  const pinNumber = req.body.pinNumber;
  const pinValue = req.body.pinValue;

  gpioManager.updatePin(pinNumber, pinValue)
    .then(result => res.json({result}))
    .catch(error => res.json({error: JSON.stringify(error)}));
});


const port = 3000;
app.listen(port, () => {
  console.log("listening");
});