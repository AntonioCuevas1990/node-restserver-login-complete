const redis = require("redis");

let clientRedis = redis.createClient();
clientRedis.on("connect", function() {
    console.log("Connected to Redis");
});

module.exports = clientRedis;