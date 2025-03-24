import React, { useState, useEffect } from 'react';

const UptimeMonitor = () => {
  const [uptime, setUptime] = useState({
    startTime: new Date(),
    duration: '0 seconds',
    percentage: 100
  });

  const [services, setServices] = useState([
    { name: 'Web Server', status: 'online', uptime: 99.98 },
    { name: 'Database', status: 'online', uptime: 99.95 },
    { name: 'API Gateway', status: 'online', uptime: 99.99 },
    { name: 'Authentication', status: 'online', uptime: 99.97 }
  ]);

  useEffect(() => {
    // Update uptime duration
    const updateUptime = () => {
      const now = new Date();
      const diff = now - uptime.startTime;
      
      // Calculate duration in a human-readable format
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      let durationText = '';
      if (days > 0) durationText += `${days} days, `;
      if (hours % 24 > 0) durationText += `${hours % 24} hours, `;
      if (minutes % 60 > 0) durationText += `${minutes % 60} minutes, `;
      durationText += `${seconds % 60} seconds`;
      
      setUptime(prev => ({
        ...prev,
        duration: durationText
      }));
    };

    // Simulate occasional service disruptions
    const simulateServiceStatus = () => {
      setServices(prevServices => {
        return prevServices.map(service => {
          // 5% chance of service disruption
          if (Math.random() < 0.05) {
            return {
              ...service,
              status: 'offline',
              uptime: parseFloat((service.uptime - 0.01).toFixed(2))
            };
          } else {
            return {
              ...service,
              status: 'online',
              uptime: service.uptime < 99.99 ? 
                parseFloat((service.uptime + 0.001).toFixed(2)) : 
                service.uptime
            };
          }
        });
      });
    };

    // Update uptime every second
    const uptimeInterval = setInterval(updateUptime, 1000);
    
    // Simulate service status changes every 10 seconds
    const serviceInterval = setInterval(simulateServiceStatus, 10000);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(serviceInterval);
    };
  }, [uptime.startTime]);

  return (
    <div className="dashboard-card">
      <h2>Uptime Monitor</h2>
      
      <div className="metric">
        <span className="metric-label">Session Duration:</span>
        <span className="metric-value">{uptime.duration}</span>
      </div>
      
      <h3>Services Status</h3>
      {services.map((service, index) => (
        <div key={index} className="metric">
          <span className="metric-label">{service.name}:</span>
          <span className={`metric-value ${service.status === 'online' ? 'online' : 'offline'}`}>
            {service.status.toUpperCase()} ({service.uptime}%)
          </span>
        </div>
      ))}
    </div>
  );
};

export default UptimeMonitor; 