/**
 * Minimal crud rest api
 */

const express = require("express");
const bodyParser = require('body-parser');

const TIMEOUT = 0; // allow some optional timeout for the loading animations

const USERS = {
  1: { id: 1, name: "Deadpool", email: "dp@example.com", comments: "Some comments", groupIds: [2, 3] },
  2: { id: 2, name: "Clint Eastwood", email: "clint@example.com", comments: "Go ahead make my day", groupIds: [1, 2] },
  3: { id: 3, name: "James Bond", email: "007@example.com", comments: "Shaken not stirred", groupIds: [2] },
  4: { id: 4, name: "Donald Duck", email: "quack@example.com", comments: "Quack quack", groupIds: [3] },
  5: { id: 5, name: "Daisy Duck", email: "daisy@example.com", comments: "Some comments", groupIds: [3] },
};

const GROUPS = {
  1: { id: 1, name: "Directors", description: "A group for film directors" },
  2: { id: 2, name: "Actors", description: "A group for real life actors" },
  3: { id: 3, name: "Cartoon Characters", description: "A group for animated cartoon characters" },
  4: { id: 4, name: "Producers", description: "A group for film producers" },
};

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => setTimeout(next, TIMEOUT));

/**
 * USERS API
 */

// catch the item operations and throw a 404 if the entity does not exist
app.all('/users/:id', function (req, res, next) {
  if (!USERS.hasOwnProperty(req.params.id)) {
    res.status(404).send('User not found');
  } else {
    next();
  }
});


// utility function to inject the related groups in a user object
const injectGroupsInUser = (user) => ({
  ...user,
  groups: user.groupIds ? user.groupIds.map(groupId => GROUPS[groupId]) : [],
});


app.route('/users').get((req, res) => {
  res.status(200).json(Object.values(USERS).map(injectGroupsInUser));
});


app.route('/users/:id').get((req, res) => {
  res.status(200).json(injectGroupsInUser(USERS[req.params.id]));
});


app.route('/users/:id').put((req, res) => {
  const id = req.params.id;
  const updates = req.body;

  USERS[id] = { ...USERS[id], ...updates, id };
  res.status(200).json(injectGroupsInUser(USERS[id]));
});


app.route('/users').post((req, res) => {
  const data = req.body;
  const id = (Math.max(...Object.keys(USERS).map(x => +x)) + 1).toString();

  USERS[id] = { ...data, id };
  res.status(200).json(injectGroupsInUser(USERS[id]));
});

app.route('/users/:id').delete((req, res) => {
  delete USERS[req.params.id];
  res.status(200).json();
});

/**
 * GROUPS API
 */

// catch the item operations and throw a 404 if the entity does not exist
app.all('/groups/:id', function (req, res, next) {
  if (!GROUPS.hasOwnProperty(req.params.id)) {
    res.status(404).send('Group not found');
  } else {
    next();
  }
});

// utility function to inject the related users of a group object
const injectUsersInGroup = (group) => ({
  ...group,
  users: Object.values(USERS).filter(user => user.groupIds.includes(group.id)),
});

app.route('/groups').get((req, res) => {
  res.status(200).json(Object.values(GROUPS).map(injectUsersInGroup));
});

app.route('/groups/:id').get((req, res) => {
  res.status(200).json(injectUsersInGroup(GROUPS[req.params.id]));
});

app.route('/groups/:id').put((req, res) => {
  const id = req.params.id;
  const updates = req.body;

  GROUPS[id] = { ...GROUPS[id], ...updates, id };
  res.status(200).json(injectUsersInGroup(GROUPS[id]));
});

app.route('/groups/:groupId/remove/:userId').post((req, res) => {
  const userId = req.params.userId;
  const groupId = +req.params.groupId;

  if (USERS.hasOwnProperty(userId)) {
    USERS[userId].groupIds = USERS[userId].groupIds.filter(id => id !== groupId);
  }

  res.status(200).json();
});

app.route('/groups').post((req, res) => {
  const data = req.body;
  const id = (Math.max(...Object.keys(GROUPS).map(x => +x)) + 1).toString();

  GROUPS[id] = { ...data, id };
  res.status(200).json(injectUsersInGroup(GROUPS[id]));
});

app.route('/groups/:id').delete((req, res) => {
  delete GROUPS[req.params.id];
  res.status(200).json();
});


const httpServer = app.listen(9000, () => {
  console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});
