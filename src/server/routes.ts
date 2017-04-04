import * as express from 'express';
import * as passport from 'passport';
import * as services from './services/index'

export function init(app: express.Application, passportIns: passport.Passport) {
  services.init(app, passportIns);
}
