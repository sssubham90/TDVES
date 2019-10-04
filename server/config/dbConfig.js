let serverConfig = {
    mongodb: {
        host: "127.0.0.1",
        port: 27017,
        name: "mongodb",
        connector: "mongodb",
        url: process.env.dbUrl || "mongodb://node:devil@127.0.0.1/TDVES",
        database: "TDVES",
        user: "",
        password: "",
    },
    host: "localhost",
    type: "http://",
    port: process.env.serverPort || '4000'
};

if (process.env.NODE_ENV === "development") {
    serverConfig.mongodb.user = "";
    serverConfig.mongodb.password = "";
} else if (process.env.NODE_ENV === "production") {
    serverConfig.mongodb.url = process.env.dbUrl || "mongodb://127.0.0.1:27017/demo";
    serverConfig.mongodb.database = "demo";
    serverConfig.mongodb.user = "";
    serverConfig.mongodb.password = "";
    serverConfig.port = process.env.serverPort || "4001";
}

module.exports = serverConfig;