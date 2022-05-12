// Config Setup

const fs = require("fs");


if (!fs.existsSync("./config.json")) {
    const template = {
        "port": "2065",
        "whitelist": false,
        "auth": false,
    }

    fs.writeFileSync("./config.json", JSON.stringify(template), "utf8");
}

const config = require("./config.json");

// Setup express
const express = require('express')
const app = express()
const port = config.port;

const serverVersions = require('./serverVersions/versions.js');
let version = serverVersions.appVersion(); // val is "alpha-0.0.1"

function createStore(path) {
    let defaultsettings = {
        settings: [{
            "default-port": "2065",
        }, ],
        remotes: [{
            name: "this-device",
            ip: "locahost",
            port: "2065",
        }, ],
    };

    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(defaultsettings));
    }
}
// API Root Endpoint
app.get('/', (req, res) => {
        if (req.query.passkey == "debug" && process.argv.includes('dev')) {
            let response = {
                "alive": true,
                "whitelist": false,
                "auth": false,
                "debugActivated": true,
            }

            if (config.whitelist) {
                response.whitelist = true
            }

            if (config.auth) {
                response.auth = true
            }

            res.json(response)

            console.log("\x1b[32m%s\x1b[0m", `Server created`);
        } else {
            let response = {
                "alive": true,
                "whitelist": false,
                "auth": false,
            }

            if (config.whitelist) {
                response.whitelist = true
            }

            if (config.auth) {
                response.auth = true
            }

            res.json(response)


        }
    })
    // API Endpoint to create a new server
app.post('/create-server', (req, res) => {
    if (req.query.passkey == "debug" && process.argv.includes('dev')) {
        console.log("\x1b[32m%s\x1b[0m", `Server created`);

        res.json({
            "underConstruction": "true",
            "debugActivated": "true",
        })
    } else {
        res.json({
            "underConstruction": "true",
        })
    }
})


app.listen(port, () => {
    console.log(`[X] -- Daemon running on port ${port} -- [X]`)
})

serverVersions.getVersionsList("vanilla").then(response => {
    let allVersions = response;

    console.log(allVersions);

    allVersions.forEach(element => {
        console.log(element);

        serverVersions.getVersion("vanilla", element).then(response => {
            console.log(response);
        })
    })
})

function log(type, content) {
    if (type == "error") {
        console.log("\x1b[31m%s\x1b[0m", `${type.toUpperCase()} || ${content}`);
    } else if (type == "success") {
        console.log("\x1b[32m%s\x1b[0m", `${type.toUpperCase()} || ${content}`);
    }
}