const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

//web socket é um novo protocolo, igual http só que wss


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>{
    res.render('index.html');
});

let messages = [];

//socket
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);
    

    //socket.on = para ouvir
    // socket.emit = para enviar a mensagem só que local
    // socket.broadcast.emit = para enviar a mensagem para todos
    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(3000);