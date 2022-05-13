const config = require("./config.js");

config.checkExists();

// Setup express
const express = require('express')
const app = express()
const port = config.port();

const serverVersions = require('./serverVersions/versions.js');

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

// API Endpoint to get MC Server Versions
app.get('/getVersionList', (req, res) => {
    if (req.query.software == "vanilla") {
        serverVersions.getVersionList("vanilla").then(versions => {
            res.json(versions)
        })
    }
})

// API Endpoint to get latest MC Server Version
app.get('/getLatestVersion', (req, res) => {
    if (req.query.software == "vanilla") {
        serverVersions.getVersionList("vanilla").then(versions => {
            res.json(versions[0])
        })
    }
})

// API Endpoint to get latest MC Server Version
app.get('/getVersion', (req, res) => {
    if (req.query.software == "vanilla") {
        serverVersions.getVersion("vanilla", req.query.version).then(versions => {
            res.json(versions)
        })
    }
})

// API Endpoint to get MC Server Versions
app.get('/getVersionDownload', (req, res) => {
    if (req.query.software == "vanilla") {
        serverVersions.getVersionDownload("vanilla", req.query.version).then(url => {
            res.json({ "id": req.query.version, "url": url })
        })
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
    console.log(`[X] -- Daemon running on http://${config.ip()}:${config.port()} -- [X]`)
})