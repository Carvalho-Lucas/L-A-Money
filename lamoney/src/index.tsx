import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({

  models: {
    transactions: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions:[
        {
          id: 1,
          title: 'Freelance Website',
          type:'deposit',
          category:'Desenvolvimento',
          amount: 6000,
          createdAt: new Date('2023-01-10 15:10'),
        },
        {
          id: 2,
          title: 'Casamento',
          type:'withdraw',
          category:'Planejamento',
          amount: 3000,
          createdAt: new Date('2023-01-10 16:00'),
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transactions')
    })
    this.post('/transactions', (schema, request) =>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transactions', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
