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