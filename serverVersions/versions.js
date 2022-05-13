module.exports = {
    appVersion: function() {
        var pjson = require('../package.json');
        version = pjson.version;

        return version;
    },

    getVersionDownload: async function(type, version) {
        return new Promise((resolve, reject) => {
            if (type == "vanilla") {
                const axios = require('axios');

                axios.get('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(response => {
                        const versions = response.data.versions;
                        versions.forEach(element => {
                            if (element.type == "release") {
                                if (element.id == version) {
                                    axios.get(element.url).then(response => {
                                        if (!response.data.downloads.hasOwnProperty('server')) {
                                            console.log("\x1b[31m%s\x1b[0m", `[X] -- Version ${version} server.jar not found -- [X]`);
                                            return;
                                        }

                                        resolve(response.data.downloads.server.url);
                                    })
                                }
                            }
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
    },

    getVersion: async function(type, version) {
        return new Promise((resolve, reject) => {
            if (type == "vanilla") {
                const axios = require('axios');

                axios.get('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(response => {
                        const versions = response.data.versions;
                        versions.forEach(element => {
                            if (element.type == "release") {
                                if (element.id == version) {
                                    resolve(element);
                                }
                            }
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
    },

    getVersionList: function(type) {
        return new Promise((resolve, reject) => {
            if (type == "vanilla") {
                const axios = require('axios');

                axios.get('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(response => {
                        const versions = response.data.versions;

                        let allVersions = new Array;

                        versions.forEach(element => {
                            if (element.type == "release") {
                                allVersions.push(element);
                            }
                        })

                        resolve(allVersions);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
    },

    create: function() {
        return "port, ip, name, password, etc";
    }
}