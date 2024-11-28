'use client';
import { useEffect, useRef, useState } from 'react';
import { useWebContainer } from '@/app/contexts/web-container-context';
import { convertFilesToTree } from '@/utils/tree';
import PreviewTerminal from '@/components/preview-terminal/preview-terminal';
import { WebContainer } from '@webcontainer/api';
import { useParams } from "next/navigation";
import { transformGuide } from '@/utils/markdown';
import CodeMirrorEditor from '@/components/code-editor/code-editor';

export default function Guide() {
  const { webContainer, setWebContainer } = useWebContainer();
  const [files, setFiles] = useState<{ file: string; content: string }[]>([]);
  const [guideText, setGuideText] = useState<string>('');
  const codeMirrorRef = useRef<HTMLIFrameElement | null>(null);
  const params = useParams();
  const guideId = params.guide;
  const courseId = params.course;

  const [code, setCode] = useState('// Write your JavaScript code here');

  const writeToFile = (fileContent: string) => {
   setCode(fileContent);
  }

  useEffect(() => {
   const fetchFiles = async () => {
      try {
         console.log('hook')
         const response = await fetch(`/api/grab-files?id=${guideId}`);

         const responseJson = await response.json();
         const data: {file: string, content: string}[] = responseJson.response;
         const initFiles = convertFilesToTree(data);
         if (!webContainer) {
            const webcontainerInstance: WebContainer = await WebContainer.boot();
            await webcontainerInstance.mount(initFiles)
            setWebContainer(webcontainerInstance);
            console.log(initFiles)
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

useEffect(() => {
  const fetchGuide = async () => {
     try {
        console.log('hook')
        const response = await fetch(`/api/grab-guide?id=${guideId}`);
        const responseJson = await response.json();
        const data = responseJson.response;
        const parsedHTML = await transformGuide(data.content)
        setGuideText(parsedHTML);
     } catch (error) {
        console.error('Error fetching gjide:', error);
     }
  };
  fetchGuide();
}, [guideId]);

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

      <div dangerouslySetInnerHTML={{ __html: guideText }}></div>

      <div>
      <h1>CodeMirror Editor</h1>
      <CodeMirrorEditor
        value={code}
        onChange={writeToFile}
        language="html" // or "javascript" / "css"
      />
    </div>

      <PreviewTerminal webContainer={webContainer} />
    </div>
  );
}
