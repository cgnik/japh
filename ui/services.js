import fetch from 'isomorphic-fetch';


export class AnalysisService {
   listAnalyses() {
      return fetch('/analysis').then(r => r.json());
   }

   analyze(operation, data) {
      return fetch('/analysis/' + operation, {
         method: 'POST',
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: {
            'content-type': 'application/json'
         },
         mode: 'cors',
         redirect: 'follow',
         body: JSON.stringify(data)
      }).then(r => r.json());
   }
}
