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

 
  app.post('/api/register', (req:any, res:any, next:any) => {
    passportIns.authenticate('local-register', (err:any, user:any, info:any) => {
      if (err) { return next(err) }
      if (!user) { 
        return res.json(null);
      }
      res.json('OK');
    })(req, res, next);
  });

  app.get('/api/detail', isLoggedIn, passport.authenticate('user-detail', {
      
    })
  );

  app.post('/api/logout',
    (req:any, res:any) => {
      req.logout();
      req.session.destroy();
      res.json('logout');
    }
  );

  function isLoggedIn(req:any, res:any, next:any) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
  }
 
}
