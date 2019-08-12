import routes from './routes';
import express from 'express';
import cors from 'cors';
import './database';

class App {
  constructor() {
    this.server = express();
    this.httpServer = require('http').Server(this.server);
    const io = require('socket.io')(this.httpServer);

    const connectedUsers = {};

    io.on('connection', socket => {
      const { user } = socket.handshake.query;

      console.log(user, socket.id);

      connectedUsers[user] = socket.id;
    });

    this.server.use((req, res, next) => {
      req.io = io;
      req.connectedUsers = connectedUsers;

      return next();
    });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().httpServer;
