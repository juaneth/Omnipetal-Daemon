module.exports = {
    pull: function() {
        return new Promise((resolve, reject) => {
            const download = require("download");
            const extract = require("extract-zip");

            download(
                "https://github.com/juaneth/Omnipetal/archive/refs/heads/ui-overhaul.zip",
                "./src/web"
            ).then(() => {
                extract("./src/web/Omnipetal-ui-overhaul.zip", {
                    dir: `${__dirname}/web/`,
                });

                resolve();

                console.log("-- Pull completed --");
            });
        });
    },
    server: function(app, express) {
        app.use(
            "/client",
            express.static(__dirname + "/web/Omnipetal-ui-overhaul/src/build")
        );
    },
};