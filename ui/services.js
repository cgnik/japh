import fetch from 'isomorphic-fetch';


export class AnalysisService {
   listAnalyses() {
      return fetch('http://localhost:3001/analysis').then(r => r.json());
   }
}
