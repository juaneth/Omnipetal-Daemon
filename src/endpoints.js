const config = require("./config.js");
const serverVersions = require("../serverVersions/versions.js");
const passkeys = require("./passkeys.js");

module.exports = {
    root: function(app) {
        app.get("/", (req, res) => {
            res.json({
                alive: true,
                whitelist: config.whitelist,
                auth: config.auth,
            });
        });
    },

    // a list of valid software to avoid repeating code
    validSoftware: ["vanilla"], 

    versions: function(app) {
        // API Endpoint to get MC Server Versions
        app.get("/versions/getVersionList", (req, res) => {
            let software = req.query?.software;
            if (!this.validSoftware.includes(software)) 
                return res.json({ error: "Invalid software" });
            serverVersions
                .getVersionList(software)
                .then((versions) => {
                    res.json(versions);
                });
        });

        // API Endpoint to get latest MC Server Version
        app.get("/versions/getLatestVersion", (req, res) => {
            let software = req.query?.software;
            if (!this.validSoftware.includes(software)) 
                return res.json({ error: "Invalid software" });
            
            serverVersions
                .getVersionList(software)
                .then((versions) => {
                    res.json(versions[0]);
                });
        });

        // API Endpoint to get specific MC Server Version
        app.get("/versions/getVersion", (req, res) => {
            let software = req.query?.software;
            if (!this.validSoftware.includes(software)) 
                return res.json({ error: "Invalid software" });

            serverVersions
                .getVersion(software, req.query.version)
                .then((versions) => {
                    res.json(versions);
                });
        });

        // API Endpoint to get MC Server Versions
        app.get("/versions/getVersionDownload", (req, res) => {
            let software = req.query?.software;
            if (!this.validSoftware.includes(software)) 
                return res.json({ error: "Invalid software" });

            serverVersions
                .getVersionDownload(software, req.query.version)
                .then((url) => {
                    res.json({ id: req.query.version, url: url });
                });
        });
    },

    servers: function(app) {
        app.get("/servers/getServers", (req, res) => {
            if (!req?.query?.passkey) {
                return res.json({ error: "NO AUTHORIZATION" });
            }

            passkeys.comparePasskey(req.query.passkey).then((response) => {
                if (!response) {
                    return res.json({ error: "BAD AUTHORIZATION" });
                }
                
                res.json({ servers: config.servers() });
            });
        });
    },
};