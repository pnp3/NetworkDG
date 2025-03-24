import React from 'react';
import './App.css';
import UptimeMonitor from './components/UptimeMonitor';
import DeviceInfo from './components/DeviceInfo';
import ErrorLog from './components/ErrorLog';
import InternetSpeed from './components/InternetSpeed';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Network Monitoring Dashboard</h1>
        <p>Real-time system performance and connectivity insights</p>
      </header>
      
      <div className="dashboard-grid">
        <InternetSpeed />
        <UptimeMonitor />
        <DeviceInfo />
        <ErrorLog />
      </div>
      
      <footer className="App-footer">
        <p>© {new Date().getFullYear()} Network Monitoring Dashboard</p>
      </footer>
    </div>
  );
}

export default App;
