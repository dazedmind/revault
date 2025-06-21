// Enhanced Watermark Component for view-file
import React, { useEffect, useState } from 'react';

interface WatermarkProps {
  userEmail: string;
  userName?: string;
  documentId?: string;
  theme?: string;
}

const WatermarkOverlay: React.FC<WatermarkProps> = ({ 
  userEmail, 
  userName, 
  documentId,
  theme = 'dark' 
}) => {
  const [timestamp, setTimestamp] = useState(new Date());
  const [userIP, setUserIP] = useState('');

  useEffect(() => {
    // Update timestamp every 30 seconds
    const interval = setInterval(() => {
      setTimestamp(new Date());
    }, 30000);

    // Get user IP (optional - for enhanced tracking)
    fetch('/api/get-client-ip')
      .then(res => res.json())
      .then(data => setUserIP(data.ip))
      .catch(() => setUserIP(''));

    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const printStyles = `
  @media print {
    .watermark-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 100px,
        rgba(0,0,0,0.1) 100px,
        rgba(0,0,0,0.1) 200px
      ) !important;
      z-index: 9999 !important;
    }
    
    .watermark-text {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) rotate(45deg) !important;
      font-size: 48px !important;
      color: #000 !important;
      opacity: 0.2 !important;
      font-weight: bold !important;
    }
  }
`;

  // ✅ Fix SVG watermark color and opacity for both themes
  const getSVGWatermark = () => {
    const color = theme === 'light' ? '000000' : 'ffffff';
    const opacity = theme === 'light' ? '0.08' : '0.15'; // Higher opacity for dark mode
    
    return `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(45 100 100)'%3E%3Ctext x='100' y='90' text-anchor='middle' font-size='12' fill='%23${color}' opacity='${opacity}'%3E${encodeURIComponent(userEmail)}%3C/text%3E%3Ctext x='100' y='110' text-anchor='middle' font-size='10' fill='%23${color}' opacity='${opacity}'%3EReVault%3C/text%3E%3C/g%3E%3C/svg%3E")`;
  };

  return (
    <>
      {/* Main Center Watermark - ✅ Fixed colors */}
      <div className={`absolute top-0 left-0 w-full h-full pointer-events-none flex justify-center items-center text-4xl font-bold z-10 ${
        theme === 'light' 
          ? 'text-gray-800 opacity-15' 
          : 'text-gray-500 opacity-20'
      }`}>
        <div className="transform rotate-45 text-center select-none">
          <div className="mb-2">{userEmail}</div>
          <div className="text-2xl">ReVault Confidential</div>
          <div className="text-lg">{formatTimestamp(timestamp)}</div>
        </div>
      </div>

      {/* Diagonal Repeating Pattern - ✅ Fixed SVG */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-5">
        <div 
          className="h-full w-full" 
          style={{
            backgroundImage: getSVGWatermark(),
            backgroundRepeat: 'repeat',
          }} 
        />
      </div>

      {/* Corner Watermarks - ✅ Fixed colors */}
      <div className={`absolute top-4 left-4 pointer-events-none text-xs font-medium z-10 select-none ${
        theme === 'light' 
          ? 'text-gray-700 opacity-25' 
          : 'text-gray-700 opacity-30'
      }`}>
        <div>ID: {documentId}</div>
        <div>{formatTimestamp(timestamp)}</div>
      </div>

      <div className={`absolute top-4 right-4 pointer-events-none text-xs font-medium z-10 select-none text-right ${
        theme === 'light' 
          ? 'text-gray-700 opacity-25' 
          : 'text-gray-700 opacity-30'
      }`}>
        <div>ReVault Confidential</div>
        <div>{userName || 'User'}</div>
        {userIP && <div>IP: {userIP}</div>}
      </div>

      <div className={`absolute bottom-4 left-4 pointer-events-none text-xs font-medium z-10 select-none ${
        theme === 'light' 
          ? 'text-gray-700 opacity-25' 
          : 'text-gray-700 opacity-30'
      }`}>
        <div>This document is protected</div>
        <div>Unauthorized sharing prohibited</div>
      </div>

      <div className={`absolute bottom-4 right-4 pointer-events-none text-xs font-medium z-10 select-none text-right ${
        theme === 'light' 
          ? 'text-gray-700 opacity-25' 
          : 'text-gray-700 opacity-30'
      }`}>
        <div>{formatTimestamp(timestamp)}</div>
        <div>© ReVault System</div>
      </div>

      {/* Edge Watermarks - ✅ Fixed colors */}
      <div className={`absolute top-1/2 left-2 transform -translate-y-1/2 -rotate-90 pointer-events-none text-sm font-medium z-10 select-none ${
        theme === 'light' 
          ? 'text-gray-600 opacity-20' 
          : 'text-gray-400 opacity-25'
      }`}>
        {userEmail} • ReVault Confidential
      </div>

      <div className={`absolute top-1/2 right-2 transform -translate-y-1/2 rotate-90 pointer-events-none text-sm font-medium z-10 select-none ${
        theme === 'light' 
          ? 'text-gray-600 opacity-20' 
          : 'text-gray-400 opacity-25'
      }`}>
        {userEmail} • ReVault Confidential
      </div>

      {/* Random Position Watermarks for Screenshots - ✅ Fixed colors */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none text-xs font-medium z-10 select-none transform rotate-12 ${
            theme === 'light' 
              ? 'text-gray-600 opacity-15' 
              : 'text-gray-400 opacity-20'
          }`}
          style={{
            top: `${10 + (i * 12)}%`,
            left: `${10 + (i * 10)}%`,
          }}
        >
          {userEmail.split('@')[0]} • {formatTimestamp(timestamp).split(' ')[1]}
        </div>
      ))}


    </>
  );
};



export default WatermarkOverlay;