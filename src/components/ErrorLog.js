import React, { useState, useEffect } from 'react';

const ErrorLog = () => {
  const [errors, setErrors] = useState([]);
  const [maxErrors] = useState(5); // Maximum number of errors to display

  useEffect(() => {
    // Simulate random network errors
    const possibleErrors = [
      'Connection timeout',
      'DNS resolution failed',
      'SSL certificate error',
      'Network request failed',
      'API endpoint unreachable',
      'Packet loss detected',
      'High latency warning',
      'Connection refused',
      'Authentication failed',
      'Rate limit exceeded'
    ];

    const simulateError = () => {
      // 30% chance of generating an error
      if (Math.random() < 0.3) {
        const randomError = possibleErrors[Math.floor(Math.random() * possibleErrors.length)];
        
        setErrors(prevErrors => {
          const newErrors = [
            {
              id: Date.now(),
              message: randomError,
              timestamp: new Date().toLocaleTimeString()
            },
            ...prevErrors
          ];
          
          // Keep only the most recent errors up to maxErrors
          return newErrors.slice(0, maxErrors);
        });
      }
    };

    // Simulate errors every 8-15 seconds
    const getRandomInterval = () => Math.floor(Math.random() * (15000 - 8000) + 8000);
    
    let errorInterval = setTimeout(function scheduleNext() {
      simulateError();
      errorInterval = setTimeout(scheduleNext, getRandomInterval());
    }, getRandomInterval());

    return () => clearTimeout(errorInterval);
  }, [maxErrors]);

  return (
    <div className="dashboard-card">
      <h2>Error Log</h2>
      
      {errors.length === 0 ? (
        <p>No errors detected. Network is functioning normally.</p>
      ) : (
        <div>
          {errors.map(error => (
            <div key={error.id} className="error-entry">
              <div className="error-time">{error.timestamp}</div>
              <div className="error-message">{error.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ErrorLog; 