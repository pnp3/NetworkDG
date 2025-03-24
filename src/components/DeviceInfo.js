import React, { useState, useEffect } from 'react';

const DeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    os: 'Detecting...',
    browser: 'Detecting...',
    screenResolution: 'Detecting...',
    deviceType: 'Detecting...'
  });

  useEffect(() => {
    // Detect OS
    const detectOS = () => {
      const userAgent = window.navigator.userAgent;
      let os = 'Unknown';
      
      if (userAgent.indexOf('Windows') !== -1) os = 'Windows';
      else if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
      else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
      else if (userAgent.indexOf('Android') !== -1) os = 'Android';
      else if (userAgent.indexOf('iOS') !== -1 || userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) os = 'iOS';
      
      return os;
    };

    // Detect browser
    const detectBrowser = () => {
      const userAgent = window.navigator.userAgent;
      let browser = 'Unknown';
      
      if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome';
      else if (userAgent.indexOf('Firefox') !== -1) browser = 'Firefox';
      else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari';
      else if (userAgent.indexOf('Edg') !== -1) browser = 'Edge';
      else if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1) browser = 'Internet Explorer';
      
      return browser;
    };

    // Detect device type
    const detectDeviceType = () => {
      const userAgent = window.navigator.userAgent;
      if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
        return 'Mobile';
      }
      return 'Desktop';
    };

    // Get screen resolution
    const getScreenResolution = () => {
      return `${window.screen.width} x ${window.screen.height}`;
    };

    setDeviceInfo({
      os: detectOS(),
      browser: detectBrowser(),
      screenResolution: getScreenResolution(),
      deviceType: detectDeviceType()
    });
  }, []);

  return (
    <div className="dashboard-card">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
        Device Information
      </h2>
      <div className="metric">
        <span className="metric-label">Operating System:</span>
        <span className="metric-value">{deviceInfo.os}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Browser:</span>
        <span className="metric-value">{deviceInfo.browser}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Screen Resolution:</span>
        <span className="metric-value">{deviceInfo.screenResolution}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Device Type:</span>
        <span className="metric-value">{deviceInfo.deviceType}</span>
      </div>
    </div>
  );
};

export default DeviceInfo; 