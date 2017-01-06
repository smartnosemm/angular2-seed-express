import * as redis from 'redis';
import { Word } from '../data/word';

/**
 * Init Names List.
 */
export function Init() {

  let RedisClient = redis.createClient();

  RedisClient.sadd("word-list",
    "longanimity",
    "eutaxy",
    redis.print);

  RedisClient.set("longanimity", JSON.stringify(new Word ("longanimity", "Patient endurance")), redis.print);
  RedisClient.set("eutaxy", JSON.stringify(new Word ("eutaxy", "good order or management")), redis.print);

  RedisClient.quit();
}
