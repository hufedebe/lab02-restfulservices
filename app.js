const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write('Hello World');
        res.end();
    }

    if(req.url === '/api/customers'){
        res.write(JSON.stringify([{"id":1,"name":"Hugo"}]));
        res.end();
    }
});


server.listen(3000);

console.log('Listening on port 3000...');