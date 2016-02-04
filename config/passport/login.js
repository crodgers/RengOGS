var LocalStrategy = require('passport-local').Strategy;
var querystring = require('querystring');
var request = require('request');
var http = require('http');
var User = require('../../app/models/user');

/**
Passport strategy for handling local logins

All authorization is via the OGS [API] {@link http://docs.ogs.apiary.io/#reference/authentication}.
Users must login with their OGS username and Application Password, which is found in the user's
[settings] {@link https://ogs.readme.io/} page.

@param {Object} passport - A Passport instance
*/

module.exports = function(passport) {
    passport.use('login', new LocalStrategy( {
        passReqToCallback: true
    },
    function(req, username, password, done) {
        User.findOne({'username': username},
            function(err, user) {
                if (err){
                    return done(err);
                }

                req.session.username = username;

                if (!user) {
                    request.post({
                        url: 'https://online-go.com/oauth2/access_token',
                        form: {
                            client_id: process.env.OGS_CLIENT_ID,
                            client_secret: process.env.OGS_CLIENT_SECRET,
                            grant_type: 'password',
                            username: username,
                            password: password
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }, function(postErr, res, body) {
                        if (postErr) {
                            return done(postErr);
                        }

                        if (!JSON.parse(body).access_token) {
                            return done(null, false);
                        }
                        var newUser = new User();
                        newUser.username = username;
                        newUser.ogs_access_token = JSON.parse(body).access_token;
                        newUser.ogs_refresh_token = JSON.parse(body).refresh_token;

                        request({
                            url: "https://online-go.com/api/v1/players/",
                            qs: {username: username},
                            method: "GET"
                        }, function(getErr, getRes, getBody) {
                            if (getErr)
                                return done(getErr);
                            newUser.ogs_id = parseInt(JSON.parse(getBody).results[0].id);

                            newUser.save(function(saveErr) {
                                if (saveErr)
                                    throw saveErr;
                                return done(null, newUser);
                            });
                        });

                        req.session.access_token = JSON.parse(body).access_token
                        req.session.refresh_token = JSON.parse(body).refresh_token
                    });   
                }

                else {
                    req.session.access_token = user.ogs_access_token;
                    req.session.refresh_token = user.ogs_refresh_token;
                    return done(null, user);
                }
            });
    }));
}