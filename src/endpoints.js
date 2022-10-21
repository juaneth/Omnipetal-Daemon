const config = require("./config.js");
const serverVersions = require("../serverVersions/versions.js");
const passkeys = require("./passkeys.js");

module.exports = {
    versions: function(app) {
        // API Endpoint to get MC Server Versions
        app.get("/getVersionList", (req, res) => {
            if (req.query.software == "vanilla") {
                serverVersions.getVersionList("vanilla").then((versions) => {
                    res.json(versions);
                });
            }
        });

        // API Endpoint to get latest MC Server Version
        app.get("/getLatestVersion", (req, res) => {
            if (req.query.software == "vanilla") {
                serverVersions.getVersionList("vanilla").then((versions) => {
                    res.json(versions[0]);
                });
            }
        });

        // API Endpoint to get specific MC Server Version
        app.get("/getVersion", (req, res) => {
            if (req.query.software == "vanilla") {
                serverVersions
                    .getVersion("vanilla", req.query.version)
                    .then((versions) => {
                        res.json(versions);
                    });
            }
        });

        // API Endpoint to get MC Server Versions
        app.get("/getVersionDownload", (req, res) => {
            if (req.query.software == "vanilla") {
                serverVersions
                    .getVersionDownload("vanilla", req.query.version)
                    .then((url) => {
                        res.json({ id: req.query.version, url: url });
                    });
            }
        });
    },

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
};