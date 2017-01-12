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

      let RedisClient = redis.createClient(),
          wordList: string[] = [],
          wordFullList: Word[] = [],
          counter: number;
      
      RedisClient.smembers('word-list',
        (err:any, replies:any) => {
          wordList = replies;
          counter = wordList.length;

          for (let word of wordList) {
            RedisClient.get(word, 
              (err:any, replies:any) => {
                wordFullList.push(replies);
                counter--;
                if (counter <= 0) {
                  res.json(wordFullList);
                  RedisClient.quit();
                };
              }
            );
          };      
      });
    });

  /**
   * Add new name.
   * @database
   */
  app.post('/api/name-list',
    (req:any, res:any, next:any) => {

      let RedisClient = redis.createClient(),
          request = req.body;

      // Add word to aggregate table
      RedisClient.sadd('word-list', request,
        (err:any, replies:any) => {
          if (err) {
            RedisClient.quit();
            return res.send(err);
          }

          RedisClient.set(request, JSON.stringify(new Word (request, "Waiting for definition...", 1)), 
            (err:any, replies:any) => {
              if (err) {
                RedisClient.quit();
                return res.send(err);
              }
            	res.json({success: true});
              RedisClient.quit();
            });
        });  
    });

  /**
   * Delete name.
   * @database
   */
  app.post('/api/name-list/:name',
    (req:any, res:any, next:any) => {

      let RedisClient = redis.createClient(),
          request = req.params.name;
          

      RedisClient.srem('word-list', request,
        (err:any, replies:any) => {
          if (err) {
            RedisClient.quit();
            return res.send(err);
          }

          RedisClient.del(request,
            (err:any, replies:any) => {
              if (err) {
                RedisClient.quit();
                return res.send(err);
              }
              res.json({success: true});
              RedisClient.quit();
            });
        });
    });

}
