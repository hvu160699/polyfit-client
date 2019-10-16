import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import RouterIndex from './config/router.main';
import Header from './layout/header';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div id="main-content" className="main">
        {RouterIndex}
      </div>
    </BrowserRouter>
  );
}

export default App;
