import React from 'react';
import './css/marketing.css'
import './css/bootstrap.min.css'
import './css/main.css';
import Menu from './components/Header';
import Timeline from './components/Timeline';






function App() {
  return (
    <div className="App">
        <Menu></Menu>
        <Timeline></Timeline>
    </div>
  );
}

export default App;
