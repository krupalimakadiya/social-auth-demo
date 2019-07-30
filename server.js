const express = require('express')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
// var GitHubStrategy = require('passport-github').Strategy;
var PinterestStrategy = require('passport-pinterest-oauth').OAuth2Strategy;


const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const CONFIG = require('./APPCONFIG');
const mysql = require('mysql');
const app = express();

//Define MySQL parameter in Config.js file.
const pool = mysql.createPool({
  host     : CONFIG.MYSQL.host,
  user     : CONFIG.MYSQL.username,
  password : CONFIG.MYSQL.password,
  database : CONFIG.MYSQL.database
});
// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new PinterestStrategy({
  clientID: CONFIG.PINTEREST.clientID,
  clientSecret: CONFIG.PINTEREST.clientSecret,
  scope: ['read_public', 'read_relationships'],
  callbackURL: CONFIG.PINTEREST.callbackURL,
  state: true
},
function(accessToken, refreshToken, profile, done) {
  console.log('profile', profile);
  if(CONFIG.MYSQL.use_database) {
    // if sets to true
    pool.query("SELECT * from userinfo where userid="+profile.id, (err,rows) => {
      if(err) throw err;
      if(rows && rows.length === 0) {
          console.log("There is no such user, adding now");
          pool.query("INSERT into userinfo(userid,username) VALUES('"+profile.id+"','"+profile.displayName+"')");
      } else {
          console.log("User already exists in database");
      }
    });
  }
  return done(null, profile);
  // User.findOrCreate({ pinterestId: profile.id }, function (err, user) {
  //     return done(err, user);
  // });
}
));

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: CONFIG.FACEBOOK.clientID,
    clientSecret: CONFIG.FACEBOOK.clientSecret ,
    callbackURL: CONFIG.FACEBOOK.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(CONFIG.MYSQL.use_database) {
        // if sets to true
        pool.query("SELECT * from userinfo where userid="+profile.id, (err,rows) => {
          if(err) throw err;
          if(rows && rows.length === 0) {
              console.log("There is no such user, adding now");
              pool.query("INSERT into userinfo(userid,username) VALUES('"+profile.id+"','"+profile.displayName+"')");
          } else {
              console.log("User already exists in database");
          }
        });
      }
      return done(null, profile);
    });
  }));

passport.use(new GoogleStrategy({
  clientID: CONFIG.GOOGLEAUTH.clientID,
  clientSecret: CONFIG.GOOGLEAUTH.clientSecret ,
  callbackURL: CONFIG.GOOGLEAUTH.callbackURL
},
function(token, refreshToken, profile, done) {  
  console.log('prrofile', profile);
  process.nextTick(function() {
      
      if(CONFIG.MYSQL.use_database) {
        // if sets to true
        pool.query("SELECT * from userinfo where userid="+profile.id, (err,rows) => {
          if(err) throw err;
          if(rows && rows.length === 0) {
              console.log("There is no such user, adding now");
              pool.query("INSERT into userinfo(userid,username) VALUES('"+profile.id+"','"+profile.displayName+"')");
          } else {
              console.log("User already exists in database");
          }
        });
      }
      return done(null, profile);
  });
}));

// passport.use(new LinkedInStrategy({
//   clientID: CONFIG.LINKDIN.clientID,
//   clientSecret: CONFIG.LINKDIN.clientSecret,
//   callbackURL: CONFIG.LINKDIN.callbackURL,
//   scope: ['r_emailaddress', 'r_basicprofile'],
// }, function(accessToken, refreshToken, profile, done) {
//   // asynchronous verification, for effect...
//   process.nextTick(function () {
//     if(CONFIG.MYSQL.use_database) {
//       // if sets to true
//       pool.query("SELECT * from userinfo where userid="+profile.id, (err,rows) => {
//         if(err) throw err;
//         if(rows && rows.length === 0) {
//             console.log("There is no such user, adding now");
//             pool.query("INSERT into userinfo(userid,username) VALUES('"+profile.id+"','"+profile.displayName+"')");
//         } else {
//             console.log("User already exists in database");
//         }
//       });
//     }    
//     return done(null, profile);
//   });
// }));

// passport.use(new GitHubStrategy({
//   clientID: CONFIG.GIT_HUB.clientID,
//   clientSecret: CONFIG.GIT_HUB.clientSecret,
//   callbackURL: CONFIG.GIT_HUB.callbackURL
// },
// function(accessToken, refreshToken, profile, cb) {
//   process.nextTick(function () {
//     //Check whether the User exists or not using profile.id
//     if(CONFIG.MYSQL.use_database) {
//       // if sets to true
//       pool.query("SELECT * from userinfo where userid="+profile.id, (err,rows) => {
//         if(err) throw err;
//         if(rows && rows.length === 0) {
//             console.log("There is no such user, adding now");
//             pool.query("INSERT into userinfo(userid,username) VALUES('"+profile.id+"','"+profile.displayName+"')");
//         } else {
//             console.log("User already exists in database");
//         }
//       });
//     }
//     return done(null, profile);
//   });
// }
// ));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'krupalideveloper', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login'}), function(req, res) {
  res.redirect('/');
});

// app.get('/auth/linkedin',passport.authenticate('linkedin', { scope: 'email'  }));
// app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { successRedirect: '/', failureRedirect: '/login'}), function(req, res){
//   res.redirect('/');
// });

// app.get('/auth/github', passport.authenticate('github'));
// app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/' }), function(req, res) {    
//   res.redirect('/');
// });

app.get('/auth/pinterest', passport.authenticate('pinterest'));
app.get('/auth/pinterest/callback', passport.authenticate('pinterest', { failureRedirect: '/login' }), function(req, res) {        
  res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.listen(8080);
