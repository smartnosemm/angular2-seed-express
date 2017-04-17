import * as express from 'express';
import * as redis from 'redis';
import * as passport from 'passport';



export function authentication(app: express.Application, passportIns: passport.Passport) {

  /**
   * sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to login page
   */
  /*
  app.post('/login', passportIns.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: false
    })
  );  */

  app.post('/api/login', (req:any, res:any, next:any) => {
    passportIns.authenticate('local-login', (err:any, user:any, info:any) => {
      if (err) { return next(err) }
      if (!user) { 
        return res.json(null);
      }
      res.json('OK');
    })(req, res, next);
  });

 
  app.post('/api/signup', (req:any, res:any, next:any) => {
    passportIns.authenticate('local-signup', (err:any, user:any, info:any) => {
      if (err) { return next(err) }
      req.session.key=req.body.username;
      res.redirect('/');
    })(req, res, next);
  });

  app.get('/api/detail', isLoggedIn, passport.authenticate('user-detail', {
      
    })
  );

  app.get('/logout',
    (req:any, res:any) => {
      req.logout();
      res.redirect('/');
    }
  );

  function isLoggedIn(req:any, res:any, next:any) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signup');
  }

  /**
   * Post login.
   
  app.post('/api/login',
    (req:any, res:any, next:any) => {

      let RedisClient = redis.createClient(),
          request = req.body;

      // Check if user exists
      RedisClient.hget('localusers', request.username,
        (err:any, replies:any) => {
          if (err) {
            RedisClient.quit();
            return res.send(err);
          }
          
          let password = replies;
          if (password == request.password) {
            res.json({success: true});
          }
          else res.json({success: false});
        });   

        RedisClient.quit();     
    });
  */

 
}
