var http = require("http");

exports.getKontoPage = (host, cookies) => {
    const options = {
        hostname: host,
        port: 80,
        path: '/konto',
        method: 'GET',
        headers: {
            'Cookie': cookies.join("; ")
        }
    };

    let req = http.get(options, res => {
        console.log('STATUS: ' + res.statusCode);
        console.log(res.headers);

        var bodyChunks = [];
        res.on('data', function(chunk) {
            bodyChunks.push(chunk);
        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            console.log('BODY: ' + body);
        })
    })

}