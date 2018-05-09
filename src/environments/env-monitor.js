
module.exports = (() => {
    const _env = process.env.NODE_ENV || 'development';
    var curEnv = {};
    if(_env == 'production') {
        curEnv = require('./prod.js');
    } else {
        curEnv = require('./dev.json');
    }
    curEnv.environment = _env;
    return curEnv
})();
