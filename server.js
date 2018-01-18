const http = require('http');
const SessionManager = require('./src/sessionManager');
const port = process.argv[process.argv.length - 1];
const app = require('./app.js');
app.sessionManager = SessionManager.createFrom('./data/sessions.json');

let server = http.createServer(app).listen(port);
