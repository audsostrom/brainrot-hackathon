import { WebContainer } from '@webcontainer/api';
import { useRef, useEffect } from 'react';

interface PreviewTerminalProps {
  webContainer: WebContainer | null;
}

/** Where users can preview their NextJs projects */
export default function PreviewTerminal({ webContainer }: PreviewTerminalProps) {
   const iframeEl = useRef<HTMLIFrameElement | null>(null);

   // documentation: https://webcontainers.io/guides/quickstart
   useEffect(() => {
      const startDevServer = async () => {
         if (webContainer) {
            const installProcess = await webContainer.spawn('npm', ['install']);
            
            const installExitCode = await installProcess.exit;
            
            if (installExitCode !== 0) {
               throw new Error('Unable to run npm install');
            }
            
            // `npm run dev`
            await webContainer.spawn('npm', ['run', 'dev']);
            webContainer.on('server-ready', (port, url) => {
               if (iframeEl.current) {
                  iframeEl.current.src = url;
               }
            });
         }
      };

      console.log('here')
      // Only start the dev server if the webContainer is ready
      if (webContainer) {
         startDevServer();
      }
   }, [webContainer]); // This hook will run when `webContainer` changes

   return (
      <div>
         <iframe frameBorder="0" id="iframeEl" ref={iframeEl}>
            The iframe; this is where the rendered view should display
         </iframe>
      </div>
   );
}
