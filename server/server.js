const express = require("express");
const bodyParser = require('body-parser');

const USERS = {
  1: { id: 1, name: "Deadpool", email: "dp@example.com", description: "Some description", groupIds: [2, 3] },
  2: { id: 2, name: "Clint Eastwood", email: "clint@example.com", description: "Go ahead make my day", groupIds: [1, 2] },
  3: { id: 3, name: "James Bond", email: "007@example.com", description: "Shaken not stirred", groupIds: [2] },
  4: { id: 4, name: "Donald Duck", email: "quack@example.com", description: "", groupIds: [3] },
  5: { id: 5, name: "Daisy Duck", email: "daisy@example.com", description: "", groupIds: [3] },
};

const GROUPS = {
  1: { id: 1, name: "Directors", description: "" },
  2: { id: 2, name: "Actors", description: "" },
  3: { id: 3, name: "Cartoon Characters", description: "" },
};

const app = express();
app.use(bodyParser.json());

const injectGroupsInUser = (user) => ({
  ...user,
  groups: user.groupIds.map(groupId => GROUPS[groupId]),
});

app.route('/users').get((req, res) => {
  return res.status(200).json(Object.values(USERS).map(injectGroupsInUser));
});

app.route('/users/:userId').get((req, res) => {
  if (!USERS.hasOwnProperty(req.params.userId)) {
    return res.status(404).send('User not found');
  } else {
    res.status(200).json(injectGroupsInUser(USERS[req.params.userId]));
  }
});

const httpServer = app.listen(9000, () => {
  console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});




