const redis = require("redis");

let clientRedis = redis.createClient();
clientRedis.on("connect", function() {
    console.log("Connected to Redis");
});

let id = 5;

clientRedis.hgetall(id, function(err, obj) {
    if (!obj) {
        console.log("El usuario no existe");
    } else {
        obj.id = id;
        console.log(obj);
    }
});

module.exports = clientRedis;