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

  return (
    <>
      {/* Main Center Watermark */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-center items-center opacity-15 text-4xl font-bold z-10">
        <div className="transform rotate-45 text-center select-none">
          <div className="mb-2">{userEmail}</div>
          <div className="text-2xl">ReVault Confidential</div>
          <div className="text-lg">{formatTimestamp(timestamp)}</div>
        </div>
      </div>

      {/* Diagonal Repeating Pattern */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-8 z-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(45 100 100)'%3E%3Ctext x='100' y='90' text-anchor='middle' font-size='12' fill='%23${theme === 'light' ? '000000' : 'ffffff'}' opacity='0.1'%3E${encodeURIComponent(userEmail)}%3C/text%3E%3Ctext x='100' y='110' text-anchor='middle' font-size='10' fill='%23${theme === 'light' ? '000000' : 'ffffff'}' opacity='0.1'%3EReVault%3C/text%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }} />
      </div>

      {/* Corner Watermarks */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-20 text-xs font-medium z-10 select-none">
        <div>{userEmail}</div>
        <div>ID: {documentId}</div>
        <div>{formatTimestamp(timestamp)}</div>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none opacity-20 text-xs font-medium z-10 select-none text-right">
        <div>ReVault Confidential</div>
        <div>{userName || 'User'}</div>
        {userIP && <div>IP: {userIP}</div>}
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none opacity-20 text-xs font-medium z-10 select-none">
        <div>This document is protected</div>
        <div>Unauthorized sharing prohibited</div>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none opacity-20 text-xs font-medium z-10 select-none text-right">
        <div>{formatTimestamp(timestamp)}</div>
        <div>© ReVault System</div>
      </div>

      {/* Edge Watermarks */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 -rotate-90 pointer-events-none opacity-15 text-sm font-medium z-10 select-none">
        {userEmail} • ReVault Confidential
      </div>

      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 rotate-90 pointer-events-none opacity-15 text-sm font-medium z-10 select-none">
        {userEmail} • ReVault Confidential
      </div>

      {/* Random Position Watermarks for Screenshots */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none opacity-10 text-xs font-medium z-10 select-none transform rotate-12"
          style={{
            top: `${15 + (i * 12)}%`,
            left: `${10 + (i * 10)}%`,
          }}
        >
          {userEmail.split('@')[0]} • {formatTimestamp(timestamp).split(' ')[1]}
        </div>
      ))}
    </>
  );
};

// Enhanced useAntiCopy hook for additional protection
export const useEnhancedAntiCopy = (userEmail: string, documentId: string) => {
  useEffect(() => {
    // Screenshot detection (limited but some coverage)
    const detectScreenshot = () => {
      // Log potential screenshot attempt
      fetch('/api/log-security-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'POTENTIAL_SCREENSHOT',
          userEmail,
          documentId,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      }).catch(() => {});
    };

    // Detect print screen key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        detectScreenshot();
        // Show warning
        alert('Screenshots are monitored and logged for security purposes.');
      }
    };

    // Detect when page loses focus (potential screenshot)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        detectScreenshot();
      }
    };

    // Prevent right-click context menu
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent drag and drop
    const preventDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDragStart);

    // CSS to prevent text selection and right-click
    const style = document.createElement('style');
    style.textContent = `
      .pdf-viewer-container {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
      }
      
      .pdf-viewer-container * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDragStart);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [userEmail, documentId]);
};

export default WatermarkOverlay;