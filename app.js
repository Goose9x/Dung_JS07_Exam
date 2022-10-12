const morgan = require("morgan");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
// Exercise 01

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// ==========================================END===========================================//
// Exercise 02
// Step 1
app.get("/api/v1/todos", (req, res) => {
  fs.readFile(
    `${__dirname}/ask-community-project/dev-data/todos.json`,
    (err, data) => {
      if (err) {
        throw err;
      } else {
        res.send(JSON.parse(data));
      }
    }
  );
});
// Step 2
app.get("/api/v1/todos/:id", (req, res) => {
  console.log(req.params.id);
  fs.readFile(
    `${__dirname}/ask-community-project/dev-data/todos.json`,
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let toDoLists = JSON.parse(data);
        toDoList = toDoLists.find((e) => e.id == req.params.id);
        if (toDoList) {
          res.send(toDoList);
        } else if (!toDoList) {
          res.status(500).json({ message: "Todo not found" });
        }
      }
    }
  );
});
// Step 3
app.post("/api/v1/todos", (req, res) => {
  console.log(req.body);
  fs.readFile(
    `${__dirname}/ask-community-project/dev-data/todos.json`,
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let toDoLists = JSON.parse(data);
        toDoList = toDoLists.find((e) => e.title == req.body.title);
        if (toDoList) {
          res.status(500).json({ message: "Todo already exists" });
        } else {
          let newList = {
            ...req.body,
            userId: Number(req.body.userId),
            id: Number(req.body.id),
            completed: Boolean(req.body.id),
          };
          toDoLists.push(newList);
          fs.writeFile(
            `${__dirname}/ask-community-project/dev-data/todos.json`,
            JSON.stringify(toDoLists),
            (err) => {
              if (err) {
                res.status(200).json({ message: err });
              } else {
                res.status(200).json({ message: "Created Successfully" });
              }
            }
          );
        }
      }
    }
  );
});
// Step 4
app.put("/api/v1/todos/:id", (req, res) => {
  fs.readFile(
    `${__dirname}/ask-community-project/dev-data/todos.json`,
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let toDoLists = JSON.parse(data);
        toDoIndex = toDoLists.findIndex((e) => e.id == req.params.id);
        if (toDoIndex == -1) {
          res.status(500).json({ message: "Todo not found" });
        } else if (toDoIndex >= 0) {
          let newList = {
            ...req.body,
            userId: Number(req.body.userId),
            id: Number(req.body.id),
            completed: Boolean(req.body.id),
          };
          toDoLists[toDoIndex] = newList;
          fs.writeFile(
            `${__dirname}/ask-community-project/dev-data/todos.json`,
            JSON.stringify(toDoLists),
            (err) => {
              if (err) {
                res.status(200).json({ message: err });
              } else {
                res.status(200).json({ message: "Update successfully" });
              }
            }
          );
        }
      }
    }
  );
});
// Step 5:
app.put("/api/v1/todos/:id", (req, res) => {
  fs.readFile(
    `${__dirname}/ask-community-project/dev-data/todos.json`,
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let toDoLists = JSON.parse(data);
        toDoIndex = toDoLists.findIndex((e) => e.id == req.params.id);
        if (toDoIndex == -1) {
          res.status(500).json({ message: "Todo not found" });
        } else if (toDoIndex >= 0) {
          toDoLists.splice(toDoIndex, 1);
          fs.writeFile(
            `${__dirname}/ask-community-project/dev-data/todos.json`,
            JSON.stringify(toDoLists),
            (err) => {
              if (err) {
                res.status(200).json({ message: err });
              } else {
                res.status(200).json({ message: "Detele successfully" });
              }
            }
          );
        }
      }
    }
  );
});
// ==========================================END===========================================//

// EX3
function checkExist(req, res, next) {
  fs.readFile(
    `${__dirname}/ask-community-project/dev-data/todos.json`,
    (err, data) => {
      let toDos = JSON.parse(data);
      if (req.body.id == toDos.id) {
        next();
      } else if (!req.body.id == toDos.id) {
        res.status(200).json({ message: "Todos not found" });
      } else if (req.body.title == toDos.title) {
        res.status(200).json({ message: "Todos already exists" });
      } else if (!req.body.title == toDos.title) {
        next();
      }
    }
  );
}
// ==========================================END===========================================//

// Ex4
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/api/v1/todos?per_page=number", (req, res) => {
  console.log(req.query.id);
  fs.readFile(
    `${__dirname}/ask-community-project/dev-data/todos.json`,
    (err, data) => {
      if (err) {
        throw err;
      } else {
        res.send(JSON.parse(data));
      }
    }
  );
});
//
//
//
// Listen server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
