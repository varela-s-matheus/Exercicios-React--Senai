import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomePage } from './pages/HomePage';

const element = React.createElement('h1', null, 'Aula React - Primeiros passos');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HomePage/>);