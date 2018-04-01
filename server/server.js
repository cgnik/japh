const express = require('express');
const parser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const operations = require('./operations');

const validate = (oper, data) => oper in operations && Array.isArray(data);
const calculate = (oper, data) => ({answer: operations[oper](data)});
const analyze = (oper, data) => validate(oper, data) ? calculate(oper, data) : {error: "Invalid request"};

app.listen(port);
app.use(express.static('static'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.route('/analysis')
   .get((req, resp) => resp.json([
      {id: "add", name: "Add", description: "sum the values"},
      {id: "subtract", name: "Subtract", description: "subtract the values from first to last"},
      {id: "multiply", name: "Multiply", description: "product of the values"},
      {id: "divide", name: "Divide", description: "quotient of all values, left to right"}
   ]));
app.route('/analysis/:operation')
   .post((req, resp) => resp.json(analyze(req.params.operation, req.body)));

