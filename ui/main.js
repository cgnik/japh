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
      console.log('valid: ', valid);
      return (
         <div className="Main">
            <Row>
               <Input s={10} type='select' label='Analytical  Operation' icon='file_upload'
                      onChange={e => this.handleOperation(e.target.value)}>
                  {this.state.analyses.map(a => (
                     <option key={a.id} value={a.id}>{a.name} : {a.description}</option>
                  ))}
               </Input>
            </Row>
            <Row>
               <Input s={10} label="Computation Values" icon='file_upload' type='text'
                      onChange={e => this.handleValues(e.target.value)}/>
            </Row>
            <Row>
               <Button disabled={!valid} onClick={this.runAnalysis.bind(this)}>Run Analysis</Button>
               {this.state.answer ?(<Chip className="right-align" >Answer: {this.state.answer}</Chip>) : ''}
            </Row>
         </div>
      );
   }
}

export default Main;
