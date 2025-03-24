import React, { useState, useEffect } from 'react';

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    latency: { value: 0, status: 'good' },
    bandwidth: { value: 0, status: 'good' },
    packetLoss: { value: 0, status: 'good' },
    jitter: { value: 0, status: 'good' }
  });

  useEffect(() => {
    // This is a simulation of network metrics
    // In a real application, you would get these from actual network tests or an API
    const simulateNetworkMetrics = () => {
      // Generate random values for demonstration
      const simulateLatency = () => {
        const value = Math.floor(Math.random() * 200);
        let status = 'good';
        if (value > 100) status = 'warning';
        if (value > 150) status = 'critical';
        return { value, status };
      };

      const simulateBandwidth = () => {
        const value = Math.floor(Math.random() * 100);
        let status = 'critical';
        if (value > 30) status = 'warning';
        if (value > 60) status = 'good';
        return { value, status };
      };

      const simulatePacketLoss = () => {
        const value = Math.floor(Math.random() * 10);
        let status = 'good';
        if (value > 2) status = 'warning';
        if (value > 5) status = 'critical';
        return { value, status };
      };

      const simulateJitter = () => {
        const value = Math.floor(Math.random() * 50);
        let status = 'good';
        if (value > 20) status = 'warning';
        if (value > 35) status = 'critical';
        return { value, status };
      };

      setMetrics({
        latency: simulateLatency(),
        bandwidth: simulateBandwidth(),
        packetLoss: simulatePacketLoss(),
        jitter: simulateJitter()
      });
    };

    // Initial simulation
    simulateNetworkMetrics();

    // Update metrics every 5 seconds
    const intervalId = setInterval(simulateNetworkMetrics, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-card">
      <h2>Performance Metrics</h2>
      
      <div className="metric">
        <span className="metric-label">Latency:</span>
        <span className="metric-value">{metrics.latency.value} ms</span>
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${metrics.latency.status}`} 
          style={{ width: `${Math.min(100, (metrics.latency.value / 200) * 100)}%` }}
        ></div>
      </div>
      
      <div className="metric">
        <span className="metric-label">Bandwidth:</span>
        <span className="metric-value">{metrics.bandwidth.value} Mbps</span>
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${metrics.bandwidth.status}`} 
          style={{ width: `${metrics.bandwidth.value}%` }}
        ></div>
      </div>
      
      <div className="metric">
        <span className="metric-label">Packet Loss:</span>
        <span className="metric-value">{metrics.packetLoss.value}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${metrics.packetLoss.status}`} 
          style={{ width: `${metrics.packetLoss.value * 10}%` }}
        ></div>
      </div>
      
      <div className="metric">
        <span className="metric-label">Jitter:</span>
        <span className="metric-value">{metrics.jitter.value} ms</span>
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${metrics.jitter.status}`} 
          style={{ width: `${(metrics.jitter.value / 50) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PerformanceMetrics; 