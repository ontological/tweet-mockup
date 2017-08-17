let express = require('express');
let ejs = require('ejs');
let twitterController = require('./controllers/TwitterController');

// Setup module vars
let app = express();

// Setup controllers
twitterController(app);

// Setup express
app.set('view engine', 'ejs');
app.listen(8000);


app.get('/', (req, res) => {
    res.render('index');
});





/*
let http = require('http');
let fs = require('fs');

let onRequest = (request, response) => {
    if(request.method === 'GET' && request.url === '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./index.html').pipe(response);
    } else {
        response.writeHead(404);
        response.write('File not found!');
        response.end();
    }
};

http.createServer(onRequest).listen(8000);

console.log('Server is running...');
*/
