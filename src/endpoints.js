const config = require("./config.js");
const serverVersions = require("../serverVersions/versions.js");
const passkeys = require("./passkeys.js");

module.exports = {
    root: function(app) {
        app.get("/", (req, res) => {
            let response = {
                alive: true,
                whitelist: false,
                auth: false,
            };

            if (config.whitelist) {
                response.whitelist = true;
            }

            if (config.auth) {
                response.auth = true;
            }

            res.json(response);
        });
    },

    versions: function(app) {
        // API Endpoint to get MC Server Versions
        app.get("/versions/getVersionList", (req, res) => {
            if (req.query.software == "vanilla") {
                serverVersions.getVersionList("vanilla").then((versions) => {
                    res.json(versions);
                });
            }
        });

        // API Endpoint to get latest MC Server Version
        app.get("/versions/getLatestVersion", (req, res) => {
            if (req.query.software == "vanilla") {
                serverVersions.getVersionList("vanilla").then((versions) => {
                    res.json(versions[0]);
                });
            }
        });

        // API Endpoint to get specific MC Server Version
        app.get("/versions/getVersion", (req, res) => {
            if (req.query.software == "vanilla") {
                serverVersions
                    .getVersion("vanilla", req.query.version)
                    .then((versions) => {
                        res.json(versions);
                    });
            }
        });

        // API Endpoint to get MC Server Versions
        app.get("/versions/getVersionDownload", (req, res) => {
            if (req.query.software == "vanilla") {
                serverVersions
                    .getVersionDownload("vanilla", req.query.version)
                    .then((url) => {
                        res.json({ id: req.query.version, url: url });
                    });
            }
        });
    },

    servers: function(app) {
        app.get("/servers/getServers", (req, res) => {
            if (req.query && req.query.passkey) {
                passkeys.comparePasskey(req.query.passkey).then((response) => {
                    if (response == true) {
                        res.json({ servers: config.servers() });
                    } else if (response == false) {
                        res.json({ error: "BAD AUTHORIZATION" });
                    }
                });
            } else {
                res.json({ error: "NO AUTHORIZATION" });
            }
        });
    },
};