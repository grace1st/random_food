var passport = require('passport');

// This is the file we created in step 2.
// This will configure Passport to use Auth0
var strategy = require('./setup-passport');

// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');
var app = express();

app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: 'bOGsvgg4RCeSTNCndHb4_bsR0xgTVlrru4DytaCc30ct4KKCpjopWsgns9zsRDt5', resave: false,  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

global.counter = 0;
var image_dir = 'images/';
global.restaurant_list = [image_dir + "hummus_.jpg",image_dir + "masaba_pol.PNG",image_dir + "pick_mix.PNG",image_dir + "shemesh_meat.PNG",image_dir + "salad.jpg"];
global.restaurant = {}

var requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

app.get('/user',
  requiresLogin,
  function (req, res) {
  res.send("user_information: " + req.user); 
  });

// Auth0 callback handler
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
  });
  
//app.use('/api/path-you-want-to-protect', jwtCheck);



app.use('/', express.static(__dirname + '/client'));

app.get('/restaurant_list', function (req, res) {
   res.send(global.restaurant_list);
});

app.get('/random_restaurant', function (req, res) {
   
   var randomNum = Math.floor(Math.random() * global.restaurant_list.length);
   res.send( global.restaurant_list[randomNum] );
});

app.get('/vote', function (req, res) {
   console.log("req parameters: " + req.param("restaurant"));
   console.log("couner accass: " + global.counter++);
   res.send('Hello and 10x for voteing u chose:' +  req.param("restaurant"));
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});