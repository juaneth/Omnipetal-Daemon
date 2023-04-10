const fs = require("fs");
const si = require("systeminformation");

module.exports = {
    ip: function() {
        const config = require("../config.json");

        let ip = config["display-ip"];

        return ip;
    },

    port: function() {
        const config = require("../config.json");

        let port = config.port;

        return port;
    },

    servers: function() {
        const config = require("../config.json");

        let servers = config.servers;

        return servers;
    },

    client: function() {
        const config = require("../config.json");

        let client = config.client;

        return client;
    },

    systemMemory: function() {
        return new Promise((resolve, reject) => {
            si.mem()
                .then((data) => {
                    // Return total memory in GB
                    resolve(Math.round(data.total / 1024 / 1024 / 1024));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};