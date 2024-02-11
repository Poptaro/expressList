const express = require("express");
const path = require("path");
const app = express();
const { createId } = require("@paralleldrive/cuid2");

//allows the use of req.body to parse it to JSON apparently
app.use(express.json());

// homepage
app.get("/", function (req, res) {
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, "todo.html"));
});

let todolist = [];

//acquire whats on the list AT THE MOMENT
app.get("/list", (req, res) => {
  return res.json(todolist);
});

//acquire certain todo list item
app.get("/list/:id", (req, res) => {
  const { id } = req.params;
  return res.json(
    todolist
      .filter(list => list.id == id)
      .map(list => ({ id: list.id, item: list.item }))
  );
});

//utilizing httPie, you can add objects via the body system
app.post("/list", (req, res) => {
  const todo = req.body;
  todo.id = createId();
  todolist.push(todo);

  return res.json(todolist);
});

//grab every list item besides the id'd one and make the old todolist the list you just grabbed. return todolist for visual sake
app.delete("/list/:id", (req, res) => {
  const { id } = req.params;
  list = todolist.filter(item => item.id != id);
  todolist = list;
  return res.status(201).json(null);
});

app.patch("/list/:id", (req, res) => {
  // get the id from the request
  const id = req.params.id;

  // find the list item with the id
  const itemIndex = todolist.findIndex(item => item.id == id);

  // modify the list item
  todolist[itemIndex].item = req.body.item;

  // return the list item
  return res.json(todolist[itemIndex]);
});

const port = 3000;
app.listen(port);
