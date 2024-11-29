'use client';
import { useEffect, useRef, useState } from 'react';
import { useWebContainer } from '@/app/contexts/web-container-context';
import { convertFilesToTree } from '@/utils/tree';
import PreviewTerminal from '@/components/preview-terminal/preview-terminal';
import { WebContainer } from '@webcontainer/api';
import { useParams } from "next/navigation";
import { transformGuide } from '@/utils/markdown';
import CodeMirrorEditor, { SupportedLanguage } from '@/components/code-editor/code-editor';


export default function Guide() {
  const { webContainer, setWebContainer } = useWebContainer();
  const [files, setFiles] = useState<{ file: string; content: string }[]>([]);
  const [guideText, setGuideText] = useState<string>('');
  const [currentFile, setCurrentFile] = useState<{ 
   file: string; 
   type: SupportedLanguage 
 } | null>(null); // Tracks the current file open in the editor, along with its content and type (HTML, CSS, etc.)
 const [currentFileContent, setCurrentFileContent] = useState<string>(''); // Tracks the current file open in the editor, along with its content and type (HTML, CSS, etc.)
  const params = useParams();
  const guideId = params.guide;
  const courseId = params.course;

  const parseLanguage = (fileType: string): SupportedLanguage => {
   const languageMap: Record<string, SupportedLanguage> = {
     html: "html",
     css: "css",
     markdown: "markdown",
     javascript: "javascript",
     jsx: "javascript",
     scss: "css",
     sass: "css",
     typescript: "javascript",
   };
 
   return languageMap[fileType.toLowerCase()] || 'markdown';
 };

  const openFile = async (file: string) => {
   if (webContainer) {
     const fileContent = await webContainer.fs.readFile(file, 'utf-8');
     const fileType = file.split('.').pop() || 'unknown';
      const language = parseLanguage(fileType);

      setCurrentFile({
         file: file,
         type: language, // Add parsed language here
       });
      setCurrentFileContent(fileContent)
   }
 }

  const writeToFile = async (fileContent: string) => {
   await webContainer?.fs.writeFile(currentFile?.file ?? '', fileContent);
  }

  useEffect(() => {
   const fetchFiles = async () => {
      try {
         console.log('hook')
         const response = await fetch(`/api/grab-files?id=${guideId}`);
         const responseJson = await response.json();
         const data: {file: string, content: string}[] = responseJson.response;
         const initFiles = convertFilesToTree(data);
         console.log(data, initFiles)
         if (!webContainer) {
            const webcontainerInstance: WebContainer = await WebContainer.boot();
            await webcontainerInstance.mount(initFiles);
            setWebContainer(webcontainerInstance);
            console.log(initFiles)
         } else {
            await webContainer.mount(initFiles);
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
         if (webContainer) {
            console.log('hook')
            const response = await fetch(`/api/grab-guide?id=${guideId}`);
            const responseJson = await response.json();
            const data = responseJson.response;
            const parsedHTML = await transformGuide(data.content)
            console.log()
            openFile(data.startingFile)
            setGuideText(parsedHTML);
         }
     } catch (error) {
        console.error('Error fetching gjide:', error);
     }
  };
  fetchGuide();
}, [webContainer]);

return (
   <div className="flex-1 flex flex-row">
     {/** Guide side on the left */}
     <div className="w-2/5 flex-1 overflow-y-auto">
       <h1>Guide</h1>
       <div dangerouslySetInnerHTML={{ __html: guideText }}></div>
     </div>

     {/** Editor and Preview */}
     <div className="w-3/5 flex-1 flex flex-col">
       <CodeMirrorEditor
         value={currentFileContent}
         onChange={writeToFile}
         language={currentFile?.type ?? "markdown"} // or "javascript" / "css"
       />
       <PreviewTerminal webContainer={webContainer} />
     </div>
   </div>
 );
}
