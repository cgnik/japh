import React, {Component} from 'react';
import {Row, Button, Input, Chip} from 'react-materialize';
import {AnalysisService} from './services';

class Main extends Component {
   constructor(props) {
      super(props);
      this.service = new AnalysisService();
      this.state = {analyses: [], operation: null, values: []};
      this.updateAnalyses();
   }

   updateAnalyses() {
      this.service.listAnalyses().then(a => {
         let newstate = {analyses: a};
         if (!this.state.operation && Array.isArray(a)) {
            newstate['operation'] = a[0].id;
         }
         this.setState(newstate);
      });
   }

   handleOperation(operation) {
      this.setState({operation: operation});
   }

   handleValues(values) {
      this.setState({values: values.split(/[ ,|\/\\;]+/gm).filter(n => Number(n) !== NaN).map(Number)});
   }

   runAnalysis() {
      this.service.analyze(this.state.operation, this.state.values).then(a => this.setState({answer: a.answer}));
   }

   isValid() {
      return this.state['operation'] && this.state['values'] && this.state['values'].length > 0;
   }

   render() {
      const valid = this.isValid();
      return (
         <div className="Main">
            <Row className="Banner">
               <div className="head">Mathelator</div>
               <div>Web calculator example application</div>
            </Row>
            <Row>
               <Input s={12} type='select' label='Analytical  Operation'
                      onChange={e => this.handleOperation(e.target.value)}>
                  {this.state.analyses.map(a => (
                     <option key={a.id} value={a.id}>{a.name} : {a.description}</option>
                  ))}
               </Input>
            </Row>
            <Row>
               <Input s={12} label="Computation Values"  type='text'
                      onChange={e => this.handleValues(e.target.value)}
                      placeholder="Enter a series of numbers, separated by commas or spaces"/>
            </Row>
            <Row className="controls">
               <div>
                  <Button disabled={!valid} onClick={this.runAnalysis.bind(this)}>Run Analysis</Button>
               </div>
               <div>               {'answer' in this.state ? (
                  <Chip className="answer">Answer: {this.state.answer}</Chip>) : ''}
               </div>
            </Row>
         </div>
      );
   }
}

export default Main;
