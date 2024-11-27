'use client';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { WebContainer } from '@webcontainer/api';
import { convertFilesToTree } from '@/utils/tree';
import PreviewTerminal from '@/components/preview-terminal/preview-terminal';

export default function Guide() {
   const [webContainer, setWebContainer] = useState<WebContainer | null>(null);
   const [files, setFiles] = useState<{file: string, content: string}[]>([]);

   useEffect(() => {
      const fetchFiles = async () => {
         try {
            console.log('hook')
            const response = await fetch('/api/grab-files');
            const responseJson = await response.json();
            const data: {file: string, content: string}[] = responseJson.response;
            const initFiles = convertFilesToTree(data);
            if (!webContainer) {
               const webcontainerInstance: WebContainer = await WebContainer.boot();
               await webcontainerInstance.mount(initFiles)
               console.log(initFiles)
               setWebContainer(webcontainerInstance);
            } else {
               await webContainer.mount(initFiles)
            }
            setFiles(data);
         } catch (error) {
            console.error('Error fetching files:', error);
         }
      };
      fetchFiles();
   }, [webContainer]);

   return (
      <div>
      <h1>Files in the Project</h1>
      <ul>
         {files.map((fileData, index) => (
            <li key={index}>
            <h3>{fileData.file}</h3>
            </li>
         ))}
      </ul>
      <PreviewTerminal webContainer={webContainer}/>
      </div>
   );
}
