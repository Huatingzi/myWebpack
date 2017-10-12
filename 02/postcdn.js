const path = require('path');
const postCDN = require('zzc-post-cdn');

postCDN({
    cwd: path.join(process.cwd(), 'dist'),
    remotePath: 'm/license',
    remoteAuth: 'Q$7H^4bcER=YFPrivpp4sN9/h*nZ8g',
    uploadError: function (err, response, body) {
        console.dir(err);
        console.dir(body);
    },
    uploadSuccess: function (err, response, body) {
        console.dir(err);
        console.dir(body);
    }
});