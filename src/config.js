const fs = require("fs");
const si = require("systeminformation");

module.exports = {
    checkExists: function() {
        // Check if config file exists, if not create it
        if (!fs.existsSync("../config.json")) {
            const template = {
                port: "2065",
                whitelist: false,
                auth: false,
                "display-ip": "localhost",
            };

            fs.writeFileSync("../config.json", JSON.stringify(template), "utf8");
        }
    },

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

    systemMemory: function() {
        return new Promise((resolve, reject) => {
            let memory = si
                .mem()
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