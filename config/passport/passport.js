var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy( {
        passReqToCallback: true
    },
    function(req, username, password, done) {
        User.findOne({'username': username},
            function(err, user) {
                if (err)
                    return done(err);
                if (!user) {
                    console.log("User not found");
                    return done(null, false);
                }
                var auth_token_req = new XMLHttpRequest();
                auth_token_req.open("POST", 'http://online-go.com/oauth2/access_token');
                auth_token_req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                auth_token_req.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log('Body: ', this.responseText);
                        return done(null, user);
                    }
                };

                var body = "client_id=" + process.env.OGS_CLIENT_ID +
                           "&client_secret=" + process.env.OGS_CLIENT_SECRET +
                           "&grant_type=password" +
                           "&username=" + username +
                           "&password=" + password;
                req.send(body);

            })
    }))
}