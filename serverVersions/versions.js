module.exports = {
    version: function() {
        var pjson = require('../package.json');
        version = pjson.version;

        return version;
    },

    getVersion: function(type, version) {
        if (type == "vanilla") {
            const axios = require('axios');

            axios.get('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(response => {
                    const versions = response.data.versions;
                    versions.forEach(element => {
                        if (element.type == "release") {
                            if (element.id == version) {
                                axios.get(element.url).then(response => {
                                        let download = response.data.downloads.server.url;

                                        console.log(download);

                                        return `${download}`;
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
    },

    create: function() {
        return "port, ip, name, password, etc";
    }
}