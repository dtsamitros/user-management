const express = require("express");
const bodyParser = require('body-parser');

const TIMEOUT = 0; // allow some optional timeout for the loading animations

const USERS = {
  1: { id: 1, name: "Deadpool", email: "dp@example.com", comments: "Some comments", groupIds: [2, 3] },
  2: { id: 2, name: "Clint Eastwood", email: "clint@example.com", comments: "Go ahead make my day", groupIds: [1, 2] },
  3: { id: 3, name: "James Bond", email: "007@example.com", comments: "Shaken not stirred", groupIds: [2] },
  4: { id: 4, name: "Donald Duck", email: "quack@example.com", comments: "", groupIds: [3] },
  5: { id: 5, name: "Daisy Duck", email: "daisy@example.com", comments: "", groupIds: [3] },
};

const GROUPS = {
  1: { id: 1, name: "Directors", description: "" },
  2: { id: 2, name: "Actors", description: "" },
  3: { id: 3, name: "Cartoon Characters", description: "" },
};

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => setTimeout(next, TIMEOUT))

const injectGroupsInUser = (user) => ({
  ...user,
  groups: user.groupIds ? user.groupIds.map(groupId => GROUPS[groupId]) : [],
});

app.route('/users').get((req, res) => {
  setTimeout(() => res.status(200).json(Object.values(USERS).map(injectGroupsInUser)), TIMEOUT);
});

app.route('/users/:id').get((req, res) => {
  const id = req.params.id;

  if (!USERS.hasOwnProperty(id)) {
    res.status(404).send('User not found');
  } else {
    res.status(200).json(injectGroupsInUser(USERS[id]));
  }
});

app.route('/users/:id').put((req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (!USERS.hasOwnProperty(id)) {
    res.status(404).send('User not found');
  } else {
    USERS[id] = { ...USERS[id], ...updates, id };
    res.status(200).json(injectGroupsInUser(USERS[id]));
  }
});

app.route('/users').post((req, res) => {
  const data = req.body;
  const id = (Math.max(...Object.keys(USERS).map(x => +x)) + 1).toString();

  USERS[id] = { ...data, id };
  res.status(200).json(injectGroupsInUser(USERS[id]));
});

const httpServer = app.listen(9000, () => {
  console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});




