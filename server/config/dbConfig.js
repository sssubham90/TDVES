let serverConfig = {
    mongodb: {
        url: process.env.dbUrl || "mongodb://node:devil@127.0.0.1/TDVES",
    },
};

module.exports = serverConfig;