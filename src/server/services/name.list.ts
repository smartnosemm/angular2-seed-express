import * as express from 'express';
import * as redis from 'redis';
import { Word } from '../data/word';

let nameData = require('../data/name.list.json');

export function nameList(app: express.Application) {

  /**
   * Get name list.
   * @static
   */
  app.get('/api/name-list/static',
    (req:any, res:any, next:any) => {

      res.json(nameData);
    });

  /**
   * Get name list.
   * @database
   */
  app.get('/api/name-list',
    (req:any, res:any, next:any) => {

      let RedisClient = redis.createClient(6379),
          wordList: string[] = [];
      
      RedisClient.smembers('word-list',
        (err:any, replies:any) => {
          console.log(`
          Reply length: ${replies.length}. 
          Reply: ${replies}.`);
          wordList = replies;
          res.json(wordList);
      });

      RedisClient.quit();
    });

  /**
   * Add new name.
   * @database
   */
  app.post('/api/name-list',
    (req:any, res:any, next:any) => {

      let RedisClient = redis.createClient(),
          request = req.body;
          // request = JSON.parse(req.body);

      RedisClient.sadd('name-list', request.name,
        (err:any, replies:any) => {
          console.log(`
          Reply: ${replies}.`);

          res.json({success: true});
        });

      RedisClient.quit();
    });

  /**
   * Delete name.
   * @database
   */
  app.delete('/api/name-list',
    (req:any, res:any, next:any) => {

      let RedisClient = redis.createClient(),
          request = req.body;
          // request = JSON.parse(req.body);

      RedisClient.srem('name-list', request.name,
        (err:any, replies:any) => {
          console.log(`
          Reply length: ${replies.length}. 
          Reply: ${replies}.`);

          res.json({success: true});
        });

      RedisClient.quit();
    });

}
