import React, { useState, useEffect } from 'react';
import './App.css';
import DeviceInfo from './components/DeviceInfo';
import NetworkStatus from './components/NetworkStatus';
import PerformanceMetrics from './components/PerformanceMetrics';
import UptimeMonitor from './components/UptimeMonitor';
import ErrorLog from './components/ErrorLog';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    // Set up event listeners for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Network Monitoring Dashboard</h1>
        <div className="connection-status">
          Status: <span className={isOnline ? 'online' : 'offline'}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </header>
      
      <main className="dashboard-container">
        <DeviceInfo />
        <NetworkStatus />
        <PerformanceMetrics />
        <UptimeMonitor />
        <ErrorLog />
      </main>
      
      <footer className="App-footer">
        <p>Network Monitoring Dashboard - Created by Prince Padi</p>
      </footer>
    </div>
  );
}

export default App;
