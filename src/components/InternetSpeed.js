import React, { useState, useEffect } from 'react';

const InternetSpeed = () => {
  const [speedStats, setSpeedStats] = useState({
    download: 0,
    upload: 0,
    ping: 0,
    lastTested: null,
    isLoading: false
  });

  const [speedHistory, setSpeedHistory] = useState([]);

  // Simulate a speed test
  const runSpeedTest = () => {
    setSpeedStats(prev => ({ ...prev, isLoading: true }));
    
    // Simulate network delay
    setTimeout(() => {
      // Generate realistic random values
      const download = Math.floor(Math.random() * 500) + 50; // 50-550 Mbps
      const upload = Math.floor(Math.random() * 100) + 20;   // 20-120 Mbps
      const ping = Math.floor(Math.random() * 50) + 5;       // 5-55 ms
      
      const newStats = {
        download,
        upload,
        ping,
        lastTested: new Date(),
        isLoading: false
      };
      
      setSpeedStats(newStats);
      
      // Add to history
      setSpeedHistory(prev => {
        const newHistory = [...prev, {
          time: new Date().toLocaleTimeString(),
          download,
          upload,
          ping
        }];
        
        // Keep only the last 5 entries
        return newHistory.slice(-5);
      });
    }, 2500);
  };

  // Run a speed test on component mount and every 30 seconds
  useEffect(() => {
    runSpeedTest();
    const interval = setInterval(runSpeedTest, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate speed quality
  const getSpeedQuality = (speed) => {
    if (speed > 100) return 'excellent';
    if (speed > 50) return 'good';
    if (speed > 20) return 'average';
    return 'poor';
  };

  // Calculate ping quality
  const getPingQuality = (ping) => {
    if (ping < 20) return 'excellent';
    if (ping < 50) return 'good';
    if (ping < 100) return 'average';
    return 'poor';
  };

  return (
    <div className="dashboard-card internet-speed-card">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
          <line x1="2" y1="20" x2="2.01" y2="20"></line>
        </svg>
        Internet Speed
      </h2>
      
      <div className="speed-indicators">
        <div className="speed-indicator">
          <div className="speed-value">
            {speedStats.isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <span className={getSpeedQuality(speedStats.download)}>
                {speedStats.download}
              </span>
            )}
          </div>
          <div className="speed-label">Download (Mbps)</div>
        </div>
        
        <div className="speed-indicator">
          <div className="speed-value">
            {speedStats.isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <span className={getSpeedQuality(speedStats.upload)}>
                {speedStats.upload}
              </span>
            )}
          </div>
          <div className="speed-label">Upload (Mbps)</div>
        </div>
        
        <div className="speed-indicator">
          <div className="speed-value">
            {speedStats.isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <span className={getPingQuality(speedStats.ping)}>
                {speedStats.ping}
              </span>
            )}
          </div>
          <div className="speed-label">Ping (ms)</div>
        </div>
      </div>
      
      <div className="speed-history">
        <h3>Recent Tests</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Download</th>
              <th>Upload</th>
              <th>Ping</th>
            </tr>
          </thead>
          <tbody>
            {speedHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.time}</td>
                <td>{entry.download} Mbps</td>
                <td>{entry.upload} Mbps</td>
                <td>{entry.ping} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button 
        className="speed-test-button" 
        onClick={runSpeedTest}
        disabled={speedStats.isLoading}
      >
        {speedStats.isLoading ? 'Testing...' : 'Run Speed Test'}
      </button>
      
      {speedStats.lastTested && (
        <div className="last-tested">
          Last tested: {speedStats.lastTested.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default InternetSpeed; 