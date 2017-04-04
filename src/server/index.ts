import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as routes from './routes';
import * as config from './config/passport';
import * as redis from 'redis';

import { Init } from './db/redis';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectredis from 'connect-redis';

/**
 * Client Dir
 * @note `dev` default.
 */
var _clientDir = '../../client/dev';
var app = express();
var redisStore = connectredis(session);
var redisClient = redis.createClient();

export function init(port: number, mode: string) {

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(compression());

  // DB Init
  Init();

  // Passport Init
  config.passportConfig(passport);
  app.use(session({ 
    store: new redisStore({
      host: 'localhost',
      port: 6379,
      client: redisClient
    }),
    secret: 'weisidictionary',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Dev Mode.
   * @note Dev server will only give for you middleware.
   */
  if (mode == 'dev') {

    app.all('/*', function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content-Type');
      next();
    });

    routes.init(app, passport);

    let root = path.resolve(process.cwd());
    let clientRoot = path.resolve(process.cwd(), './dist/client/dev');
    app.use(express.static(root));
    app.use(express.static(clientRoot));

    var renderIndex = (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve(__dirname, _clientDir + '/index.html'));
    };
    app.get('/*', renderIndex);

    /**
     * Api Routes for `Development`.
     */
  }
  else {
    /**
     * Prod Mode.
     * @note Prod mod will give you static + middleware.
     */

    /**
     * Api Routes for `Production`.
     */
    routes.init(app, passport);

    /**
     * Client Dir
     */
    _clientDir = '../../client/prod';

    /**
     * Static.
     */
    app.use('/js', express.static(path.resolve(__dirname, _clientDir + '/js')));
    app.use('/css', express.static(path.resolve(__dirname, _clientDir + '/css')));
    app.use('/assets', express.static(path.resolve(__dirname, _clientDir + '/assets')));

    /**
     * Spa Res Sender.
     * @param req {any}
     * @param res {any}
     */
    var renderIndex = function (req: express.Request, res: express.Response) {
      res.sendFile(path.resolve(__dirname, _clientDir + '/index.html'));
    };

    /**
     * Prevent server routing and use @ng2-router.
     */
    app.get('/*', renderIndex);
  }

  /**
   * Server with gzip compression.
   */
  return new Promise<http.Server>((resolve, reject) => {
    let server = app.listen(port, () => {
      var port = server.address().port;
      console.log('App is listening on port:' + port);
      resolve(server);
    });
  });
};
