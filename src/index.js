const config = require("./config.js");

config.checkExists();

// Setup express
const express = require("express");
const app = express();
const port = config.port();

const serverVersions = require("../serverVersions/versions.js");
const passkeys = require("./passkeys.js");

const endpoints = require("./endpoints.js");

endpoints.root(app);

endpoints.versions(app);

// API Endpoint to get System Memory
app.get("/systemMemory", (req, res) => {
    let systemMemory = config.systemMemory().then((data) => {
        res.json({ memory: data });
    });
});

// API Endpoint to create a new server
app.post("/create-server", (req, res) => {
    if (process.argv.includes("dev")) {
        res.json({
            underConstruction: "true",
            debugActivated: "true",
        });
    } else {
        res.json({
            underConstruction: "true",
        });
    }
});

// Show the server's IP address
app.listen(port, () => {
    console.log(
        `[X] -- Daemon running on http://${config.ip()}:${config.port()} -- [X]`
    );
});