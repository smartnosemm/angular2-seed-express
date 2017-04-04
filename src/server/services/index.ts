import * as express from 'express';
import * as passport from 'passport';
import { nameList } from './name.list';
import { authentication } from './authentication';


export function init(app: express.Application, passportIns: passport.Passport) { 
    nameList(app);
    authentication(app, passportIns);
}
