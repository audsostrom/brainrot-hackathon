import { WebContainer } from '@webcontainer/api';
import { useRef, useEffect } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

import { reloadPreview } from '@webcontainer/api';

interface PreviewTerminalProps {
  webContainer: WebContainer | null;
}

export default function PreviewTerminal({ webContainer }: PreviewTerminalProps) {
  const iframeEl = useRef<HTMLIFrameElement | null>(null);
  const reloadIconRef = useRef<SVGSVGElement | null>(null); // Ref for the ReloadIcon


  useEffect(() => {
    const startDevServer = async () => {
      if (webContainer) {
        const installProcess = await webContainer.spawn('npm', ['install']);

        const installExitCode = await installProcess.exit;
        console.log('exist code', installExitCode)

        if (installExitCode === 0) {
          // `npm run dev`
          await webContainer.spawn('npm', ['run', 'dev']);
          webContainer.on('server-ready', (port, url) => {
            if (iframeEl.current) {
              iframeEl.current.src = url;
            }
          });
        }

      }
    };

    // Only start the dev server if the webContainer is ready
    if (webContainer) {
      startDevServer();
    }
  }, [webContainer]);

  const handleIframeLoad = () => {
    if (reloadIconRef.current) {
      reloadIconRef.current.style.color = 'white'; // Change icon to white when iframe loads
      reloadIconRef.current.style.pointerEvents = 'auto'; // Enable the icon interaction once iframe is loaded
    }
  };

  const handleIframeError = () => {
    if (reloadIconRef.current) {
      reloadIconRef.current.style.color = 'gray'; // Grayed out when iframe loading fails or is in progress
      reloadIconRef.current.style.pointerEvents = 'none'; // Disable interaction during loading
    }
  };

  const reloadWebContainerPreview = async () => {
    if (reloadIconRef.current) {
      reloadIconRef.current.style.color = 'gray'; // Set icon color to gray during reload
      reloadIconRef.current.style.pointerEvents = 'none'; // Disable icon interaction during reload
    }


    // Use WebContainers API's reloadPreview method to reload the iframe
    if (iframeEl.current) {
      try {
        // Reload the iframe
        reloadPreview(iframeEl.current, 5000); // Optionally provide a timeout (e.g., 5000 ms)
      } catch (error) {
        console.error('Error reloading preview:', error);
      }
    }
  };

  return (
    <div className="w-full h-[calc(100vh-68px-300px)] bg-primary">
      <div className="flex flex-row bg-primary text-foreground px-3 py-1 items-center justify-center border border-secondary">
        <ReloadIcon
          ref={reloadIconRef}
          className="ml-auto"
          style={{
            color: 'gray', // Initially grayed out
          }}
          onClick={reloadWebContainerPreview} // Trigger reloadPreview when clicked
        />
      </div>
      <iframe
        className="w-full h-full border border-secondary"
        frameBorder="0"
        ref={iframeEl}
        src="/loading.html"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      >
        The iframe; this is where the rendered view should display
      </iframe>
    </div>
  );
}
