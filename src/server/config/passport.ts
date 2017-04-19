import * as passport from 'passport';
//import * as bcryptjs from 'bcryptjs';
import { User } from '../data/user';

var LocalStrategy = require('passport-local').Strategy;

const user1 = {
  username: 'weisi',
  password: 'dd',
  id: 1
};

export function passportConfig(passportIns: passport.Passport) {

    // used to serialize the user for the session
    passportIns.serializeUser(
      (user:User, done:any)=> {
        done(null, user);
    });

    // used to deserialize the user
    passportIns.deserializeUser(
      (user:any, done:any) => {
        done(null, user);
    });

    passportIns.use('local-register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req:any, username:any, password:any, done:any) => {
        var redisClient = req.sessionStore.client;
        process.nextTick(() => {
          findUser(redisClient, username, (err: any, user: User) => {
            if (err) {
              return done(err);
            }
            if (user) {
              return done(null, false, { message: 'The username exists.' });
            } else {
              var newUser = new User(username, password);
              redisClient.set("".concat("user:", username), JSON.stringify(newUser), (err:any, replies:any) => {
                if (err) return done(err);
                return done(null, newUser);
              });
            }
          });
        });
      }
    ));

    passportIns.use('local-login', new LocalStrategy( {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req:any, username:any, password:any, done:any) => {
        var redisClient = req.sessionStore.client;
        findUser(redisClient, username, (err: any, user: User) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (password !== user.password) {
            return done(null, false);
          }
          return done(null, user);
        })}
    ));
}

function findUser(redisClient:any, username:string, callback:any) {
  redisClient.get("".concat("user:", username), (err:any, replies:any) => {
    if (replies) return callback(null, JSON.parse(replies));
    return callback(null);
  });
}