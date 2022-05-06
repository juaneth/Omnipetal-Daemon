module.exports = {
    version: function() {
        var pjson = require('../package.json');
        version = pjson.version;

        return version;
    },

    create: function() {
        return "port, ip, name, password, etc";
    }
}