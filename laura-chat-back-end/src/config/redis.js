const redis = require("redis");
const client = redis.createClient({host:'ec2-52-203-79-115.compute-1.amazonaws.com',
                                   port:'24339',
                                   url :'redis://h:pdf97171ea1df91c6ead56a0214a38c17160583bdf5f26e4860cc1f6566e47e2f@ec2-52-203-79-115.compute-1.amazonaws.com:24339'});
client.on('connect', () => console.log('Connected to Redis') )

client.on("error", function (err) {
    console.log("Error " + err);
});

exports.redisClient = client;