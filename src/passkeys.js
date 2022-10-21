const fs = require("fs");
const bcrypt = require("bcrypt");

module.exports = {
    setPasskey: async function(passkey) {
        bcrypt.hash(passkey, 10, function(err, hash) {
            fs.writeFileSync("./data", hash);
        });
    },

    comparePasskey: async function(passkey) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(passkey, fs.readFileSync("./data", 'utf-8'), function(err, result) {
                if (result == true) {
                    resolve(true);
                } else if (result == false) {
                    resolve(false)
                }
            });
        })
    },
}