import * as redis from 'redis';
import { Word } from '../data/word';

/**
 * Init Names List.
 */
export function Init() {

  let RedisClient = redis.createClient();

  RedisClient.zadd("simple-word-list",
    "longanimity",
    "eutaxy",
    redis.print);

  RedisClient.sadd("word-list",
    JSON.stringify(new Word ("longanimity", "Patient endurance")),
    JSON.stringify(new Word ("eutaxy", "good order or management")),
    redis.print);

  RedisClient.quit();
}
