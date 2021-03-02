var request = require('superagent');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/signup', function (req, res) {
  var mailchimpInstance   = 'us6',
    listUniqueId        = 'b6a82d89f0',
    mailchimpApiKey     = '637274b5ab272affbf7df7d3723ea2a1-us6';

app.post('/signup', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.firstName,
            'LNAME': req.body.lastName
          }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send('Signed Up!');
              } else {
                res.send('Sign Up Failed :(');
              }
          });
});
});

