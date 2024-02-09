const express = require('express');
const path = require('path');
const app = express();

//allows the use of req.body to parse it to JSON apparently
app.use(express.json())

// homepage
app.get('/', function (req, res) {
    app.use(express.static(path.join(__dirname)));
    res.sendFile(path.join(__dirname, 'todo.html'));
});


let todolist = [
    {
        "id": 1,
        "item": 'buy bread',
        "password": 'peanutbuttuh'
    },
    {
        "id": 2,
        "item": 'watch 90 movies',
        "password": 'chunkymonkey'
    }
];

//acquire whats on the list AT THE MOMENT
app.get('/list', (req, res) => {
    return res.json(todolist.map(list => ({id: list.id, item: list.item})))
})

//acquire certain todo list item
app.get('/list/:id', (req, res) => {
    const { id } = req.params
    return res.json(
        todolist
        .filter(list => list.id == id)
        .map(list => ({id: list.id, item: list.item})))
          
})

//utilizing httPie, you can add objects via the body system
app.post('/list', (req, res) => {
    const newListItem = req.body;
    todolist.push(newListItem)
    
    return res.json(todolist)
})

//grab every list item besides the id'd one and make the old todolist the list you just grabbed. return todolist for visual sake
app.delete('/list/:id', (req, res) => {
    const { id } = req.params
    list = todolist.filter(item => item.id != id)
    todolist = list
    return res.json(todolist)
})

const port = 3000;
app.listen(port);
