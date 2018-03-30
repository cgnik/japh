const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port);
app.use(express.static('static'))
app.route('/function')
   .get((req, resp) => resp.json({something: "grand"}));

console.log('todo list RESTful API server started on: ' + port);
