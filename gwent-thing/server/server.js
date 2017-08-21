
let fs = require('fs');
let path = require('path');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

const co = require('co');

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({limit: '1mb'}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/getdecks/:user', (req, res) => {
  //return the users decks
});

//Decks will NOT be saved as json files in the future. This will be changed to databases instead.
app.post('/api/savedeck/:user/:deckname', (req, res) => {
  let dir = './tmpFiles/'+req.params.user;
  let exists =  fs.existsSync(dir);
  if (!exists){
      fs.mkdirSync(dir);
  }
  fs.writeFile(dir+'/'+req.params.deckname+'.json', JSON.stringify(req.body));
})

app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});