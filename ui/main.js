import React, {Component} from 'react';
import {Row, Icon, Button, Input} from 'react-materialize';
import {AnalysisService} from './services';

class Main extends Component {
   constructor(props) {
      super(props);
      this.service = new AnalysisService();
      this.state = {analyses: []};
      this.updateAnalyses();
   }

   updateAnalyses() {
      this.service.listAnalyses().then(a => this.setState({analyses: a}));
   }

   render() {
      return (
         <div className="Main">
            <Row>
               <Input s={12} type='select' label='Select Analytical  Operation' icon='file_upload' defaultValue='2'>
                  {this.state.analyses.map(a => (
                     <option value={a.id}>{a.name} : {a.description}</option>
                  ))}
               </Input>
            </Row>
         </div>
      );
   }
}

export default Main;
