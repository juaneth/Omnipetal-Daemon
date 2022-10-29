const fs = require("fs");

if (!fs.existsSync("./config.json")) {
    const template = {
        port: "2065",
        whitelist: false,
        auth: false,
        "display-ip": "localhost",
        client: false,
    };

    fs.writeFileSync("./config.json", JSON.stringify(template), "utf8");
}

const web = require("./web.js");

const config = require("./config.js");

// Setup express
const express = require("express");
const app = express();
const port = config.port();

// Import things
const serverVersions = require("../serverVersions/versions.js");
const passkeys = require("./passkeys.js");
const endpoints = require("./endpoints.js");

// DEV
passkeys.setPasskey("AAABBB");

// Add endpoints
endpoints.root(app);
endpoints.versions(app);
endpoints.servers(app);

if (config.client) {
    web.pull().then((done) => {
        web.server(app, express);
    });
}

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
        `[X] ------- Daemon running on http://${config.ip()}:${config.port()} ------- [X]`
    );
});