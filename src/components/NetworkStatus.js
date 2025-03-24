import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [networkInfo, setNetworkInfo] = useState({
    connectionType: 'Detecting...',
    effectiveType: 'Detecting...',
    downlink: 'Detecting...',
    rtt: 'Detecting...'
  });

  useEffect(() => {
    const updateNetworkInfo = () => {
      // Check if the Network Information API is available
      if ('connection' in navigator) {
        const connection = navigator.connection || 
                          navigator.mozConnection || 
                          navigator.webkitConnection;
        
        if (connection) {
          setNetworkInfo({
            connectionType: connection.type || 'Unknown',
            effectiveType: connection.effectiveType || 'Unknown',
            downlink: connection.downlink ? `${connection.downlink} Mbps` : 'Unknown',
            rtt: connection.rtt ? `${connection.rtt} ms` : 'Unknown'
          });
          
          // Add event listener for connection changes
          connection.addEventListener('change', updateNetworkInfo);
          return () => connection.removeEventListener('change', updateNetworkInfo);
        }
      } else {
        // Fallback if Network Information API is not available
        setNetworkInfo({
          connectionType: 'API not supported',
          effectiveType: navigator.onLine ? 'Online' : 'Offline',
          downlink: 'API not supported',
          rtt: 'API not supported'
        });
      }
    };

    updateNetworkInfo();
  }, []);

  return (
    <div className="dashboard-card">
      <h2>Network Status</h2>
      <div className="metric">
        <span className="metric-label">Connection Type:</span>
        <span className="metric-value">{networkInfo.connectionType}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Effective Type:</span>
        <span className="metric-value">{networkInfo.effectiveType}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Downlink Speed:</span>
        <span className="metric-value">{networkInfo.downlink}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Round Trip Time:</span>
        <span className="metric-value">{networkInfo.rtt}</span>
      </div>
    </div>
  );
};

export default NetworkStatus; 