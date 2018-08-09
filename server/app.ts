import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as socketIo from 'socket.io';
import * as expressJwt from 'express-jwt';

import setRoutes from './routes';

import { Message } from './models';

import { SocketClass } from './controllers';

class Server {

  public static readonly PORT = '3000';
  public app: any;
  public routes: any;
  private server: any;
  private io: any;
  private dotenv: any;
  private port: string;


  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
    this.setRoutes();
    this.mongoConnect();


  }

  private createApp(): void {
    this.app = express();

    this.app.all('/*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Headers", "*");
     next();
    });

    this.app.use('/', express.static(path.join(__dirname, '../public')));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));

  //   this.app.use(expressJwt({
  //   secret: 'tameagdeaneamhgomaith',
  //   getToken: function (req) {
  //
  //       if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //           return req.headers.authorization.split(' ')[1];
  //       } else if (req.query && req.query.token) {
  //           return req.query.token;
  //       }
  //       return null;
  //   }
  // }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));


  }

  private createServer(): void {
    this.server = http.createServer(this.app);

  }

  private mongoConnect(): void {
    this.dotenv = dotenv;
    this.dotenv.load({ path: '.env' });
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true  });
    const db = mongoose.connection;
    (<any>mongoose).Promise = global.Promise;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    })


  }

  private config(): void {
    this.port = process.env.PORT || Server.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    let sockets = new SocketClass();
    sockets.init(this.io, this.port);

  }

  private setRoutes(): void {
   setRoutes(this.app);
  }




}

let server = Server.bootstrap();
export default server.app;
