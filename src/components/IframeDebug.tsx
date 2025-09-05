'use client';

import { useState } from 'react';

interface IframeDebugProps {
  code: string;
  title: string;
}

export default function IframeDebug({ code, title }: IframeDebugProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium">Iframe Status:</span>
        {iframeLoaded && (
          <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
            ✓ Loaded Successfully
          </span>
        )}
        {iframeError && (
          <span className="text-red-600 bg-red-100 px-2 py-1 rounded">
            ✗ Error Loading
          </span>
        )}
        {!iframeLoaded && !iframeError && (
          <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
            ⏳ Loading...
          </span>
        )}
      </div>
      
      <div className="border-2 border-black h-[600px] rounded-lg overflow-hidden">
        <iframe
          srcDoc={code}
          className="w-full h-[600px]"
          title={title}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
      
      {iframeError && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
          <p className="font-medium">Iframe failed to load. This could be due to:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>JavaScript errors in the generated code</li>
            <li>Browser security restrictions</li>
            <li>Invalid HTML structure</li>
          </ul>
        </div>
      )}
    </div>
  );
}
