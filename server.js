const express = require('express');
const parser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;


const add = nums => (nums || []).reduce((accum, val) => accum + val, 0);
const subtract = nums => (nums || []).reduce((accum, val) => accum - val, 0);

const operations = {
   add: add,
   subtract: subtract
};
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
      {id: "subtract", name: "Subtract", description: "subtract the values from first to last"}
   ]));
app.route('/analysis/:operation')
   .post((req, resp) => {
      let data = req.body;
      console.log(req.params.operation, data);
      return resp.json(analyze(req.params.operation, data));
   });

