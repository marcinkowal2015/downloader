const program = require("commander"),
    querystring = require('querystring'),
    http = require("http");

program.version("0.0.1")
    .option("-l, --login [name]", "login")
    .option("-p, --password [password]", "password")
    .option("-h, --host [host]", "host")
    .parse(process.argv);

const postData = querystring.stringify({
    v: "konto|main",
    c: "aut",
    f: "loginUzt",
    friendlyredir: "1",
    usr_login: program.login,
    usr_pass: program.password
});

const options = {
    hostname: program.host,
    port: 80,
    path: '/index.php',
    method: 'POST',
    headers: {
        'Content-Length': Buffer.byteLength(postData),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const req = http.request(options, res => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();