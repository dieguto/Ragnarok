const express = require('express');
const path = require('path');
const app = express();
const porta = 4002;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>{
    res.render('index.html');
});

app.listen(porta, () => {
    console.log("Chat html rodando na porta " + porta);
});