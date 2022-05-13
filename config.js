const fs = require("fs");

module.exports = {
    checkExists: function() {
        // Check if config file exists, if not create it
        if (!fs.existsSync("./config.json")) {
            const template = {
                "port": "2065",
                "whitelist": false,
                "auth": false,
                "ip": "localhost",
            }

            fs.writeFileSync("./config.json", JSON.stringify(template), "utf8");
        }
    },

    ip: function() {
        const config = require("./config.json")

        let ip = config.ip;

        return ip;
    },

    port: function() {
        const config = require("./config.json")

        let port = config.port;

        return port;
    },
}