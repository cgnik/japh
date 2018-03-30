const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port);
app.use(express.static('static'))
app.route('/analysis')
   .get((req, resp) => resp.json([
      {name: "Add", description: "sum the values"},
      {name: "Subtract", description: "subtract the values from first to last"}
   ]));

