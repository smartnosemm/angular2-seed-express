import * as redis from 'redis';
import { Word } from '../data/word';
import { User } from '../data/user';

/**
 * Init Names List.
 */
export function Init() {

  let RedisClient = redis.createClient();

  RedisClient.sadd("word-list",
    "longanimity",
    redis.print);

  RedisClient.set("longanimity", JSON.stringify(new Word ("longanimity", "Patient endurance", 1)), redis.print);
  RedisClient.set("weisi", JSON.stringify(new User("weisi", "dd")), redis.print);
  //RedisClient.set("eutaxy", JSON.stringify(new Word ("eutaxy", null, 1)), redis.print);

  RedisClient.quit();
}
