const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// app.use(setUser);

app.get("/api/h", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/dashboard', (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin', (req, res) => {
  res.send('Admin Page')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// function setUser(req, res, next) {
//   const userId = req.body.userId
//   if (userId) {
//     req.user = users.find(user => user.id === userId)
//   }
//   next()
// }