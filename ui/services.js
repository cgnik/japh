import fetch from 'isomorphic-fetch';


export class AnalysisService {
   listAnalyses() {
      return fetch('/analysis').then(r => r.json());
   }
}
