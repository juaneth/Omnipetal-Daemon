// Setup express
const express = require('express')
const app = express()
const port = 3000

const installer = require('./installer/installer.js');
let version = installer.version(); // val is "alpha-0.0.1"

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
        res.json({
            "alive": "true",
        })
    })
    // API Endpoint to create a new server
app.post('/create-server', (req, res) => {
    res.json({
        "underConstruction": "true",
    })
})

app.listen(port, () => {
    console.log(`[X] -- Daemon running on port ${port} -- [X]`)
})

function getVersion(type, version) {
    if (type == "vanilla") {
        const axios = require('axios');

        axios.get('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(response => {
                const versions = response.data.versions;
                versions.forEach(element => {
                    if (element.type == "release") {
                        if (element.id == version) {
                            axios.get(element.url).then(response => {
                                    let download = response.data.downloads.server.url;

                                    return download;
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function log(type, content) {
    if (type == "error") {
        console.log("\x1b[31m%s\x1b[0m", `${type.toUpperCase()} || ${content}`);
    } else if (type == "success") {
        console.log("\x1b[32m%s\x1b[0m", `${type.toUpperCase()} || ${content}`);
    }
}