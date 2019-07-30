// module.exports = function (app, passport) {

//     // route for home page
//     app.get('/', function (req, res) {
//         res.render('index.ejs'); // load the index.ejs file
//     });

//     // route for showing the profile page
//     app.get('/profile', isLoggedIn, function (req, res) {
//         res.render('profile.ejs', {
//             user: req.user // get the user out of session and pass to template
//         });
//     });

//     // route for logging out
//     app.get('/logout', function (req, res) {
//         req.logout();
//         res.redirect('/');
//     });

//     app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//     app.get('/auth/google/callback',
//         passport.authenticate('google', {
//             successRedirect: '/profile',
//             failureRedirect: '/'
//         }));

// };

// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }