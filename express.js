const express = require('express');
const path = require('path');
const app = express();

todolist = [
    {
        'id': '1',
        'item': 'buy bread',
    },
    {
        'id': '2',
        'item': 'watch 90 movies'
    }
];

app.get('/', function (req, res) {
    app.use(express.static(path.join(__dirname)));
    res.sendFile(path.join(__dirname, 'todo.html'));
});

app.get('/list', (req, res) => {
    res.send(todolist)
})

app.post('/list', (req, res) => {
    res.send(todolist.push(req))
})


const port = 3000;
app.listen(port);
