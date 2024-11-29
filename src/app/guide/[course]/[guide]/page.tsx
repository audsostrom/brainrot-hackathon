'use client';
import { useEffect, useRef, useState } from 'react';
import { useWebContainer } from '@/app/contexts/web-container-context';
import { convertFilesToTree } from '@/utils/tree';
import PreviewTerminal from '@/components/preview-terminal/preview-terminal';
import { WebContainer } from '@webcontainer/api';
import { redirect, useParams } from "next/navigation";
import { transformGuide } from '@/utils/markdown';
import CodeMirrorEditor, { SupportedLanguage } from '@/components/code-editor/code-editor';
import Dropdown from '@/components/radix-ui/dropdown';
import { CaretLeftIcon, CaretRightIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { GuideType } from '@/app/models/guide';
import { Skeleton } from '@/components/skeleton/skeleton';
import { IconButton } from '@radix-ui/themes';



export default function Guide() {
   const { webContainer, setWebContainer } = useWebContainer();
   const [files, setFiles] = useState<{ file: string; content: string }[]>([]);
   const [currentCourse, setCurrentCourse] = useState<any>(null);
   const [currentGuide, setCurrentGuide] = useState<GuideType & { parsedGuideText: string } | null>(null);
   const [currentFile, setCurrentFile] = useState<{
      file: string;
      type: SupportedLanguage
   } | null>(null); // Tracks the current file open in the editor, along with its content and type (HTML, CSS, etc.)
   const [currentFileContent, setCurrentFileContent] = useState<string>(''); // Tracks the current file open in the editor, along with its content and type (HTML, CSS, etc.)
   const params = useParams();
   const guideId = params.guide;
   const courseId = params.course;

   const [selectedItem, setSelectedItem] = useState<string | null>(null);

   const handleSelect = (item: string) => {
      setSelectedItem(item);
      console.log('Selected item:', item);
   };

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
            const response = await fetch(`/api/grab-files?id=${guideId}`);
            const responseJson = await response.json();
            const data: { file: string, content: string }[] = responseJson.response;
            const initFiles = convertFilesToTree(data);
            if (!webContainer) {
               const webcontainerInstance: WebContainer = await WebContainer.boot();
               await webcontainerInstance.mount(initFiles);
               setWebContainer(webcontainerInstance);
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
               const response = await fetch(`/api/grab-guides?id=${courseId}`);
               const responseJson = await response.json();
               const course = responseJson.response;
               const guide = course.guides.filter((guide: any) => guide._id === guideId)[0];
               if (guide) {;
                  const parsedHTML = await transformGuide(guide.content)
                  openFile(guide.startingFile);
                  setCurrentCourse(course);
                  setCurrentGuide({ ...guide, parsedGuideText: parsedHTML });
               } else {
                  console.error("Guide not found!");
               }
            }
         } catch (error) {
            console.error('Error fetching guides:', error);
         }
      };
      fetchGuide();
   }, [courseId, webContainer]);

   const handleNextGuide = () => {
      if (currentCourse && currentCourse.guides) {
         const nextIndex = currentCourse.guides.findIndex((guide: any) => guide._id === guideId) + 1;
         if (nextIndex < currentCourse.guides.length) {
            redirect(`/guide/${courseId}/${currentCourse.guides[nextIndex]._id}`)
         }
      }
   };

   // Navigate to the previous guide
   const handlePrevGuide = () => {
      if (currentCourse && currentCourse.guides) {
         const prevIndex = currentCourse.guides.findIndex((guide: any) => guide._id === guideId) - 1;
         if (prevIndex >= 0) {
            redirect(`/guide/${courseId}/${currentCourse.guides[prevIndex]._id}`)
         }
      }
   };

   return (
      <div className="flex-1 flex flex-row max-h-[calc(100vh-68px)] overflow-y-hidden">
         {/** Guide side on the left */}
         <div className="w-2/5">
            <div className='border-b-[1px] border-primary p-2 flex flex-row items-center'>
               <Dropdown
                  label={<CaretSortIcon className='size-8' />}
                  items={['Option 1', 'Option 2', 'Option 3']}
                  onSelect={handleSelect}
               />
               <div className='ml-2'>
                  {currentCourse?.title ? <div className='h-7 text-xl font-bold mb-1'>{currentCourse.title}</div> : <Skeleton className="w-32 h-7 rounded-full mb-1" />}
                  {currentGuide?.title ? <div className='h-6 text-secondary'>{currentGuide?.title}</div> : <Skeleton className="w-44 h-6 rounded-full" />}
               </div>

               <div className='ml-auto flex flex-row'>
                  <IconButton onClick={handlePrevGuide}>
                  <CaretLeftIcon className='size-7' />
                  </IconButton>
                  <IconButton onClick={handleNextGuide}>
                  <CaretRightIcon className='size-7' />
                  </IconButton>
               </div>

            </div>
            <div className='p-4 h-full overflow-y-auto mb-4'>
               {currentGuide?.description && <blockquote className="p-4 mt-2 mb-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                  <p className="text-md italic font-medium leading-relaxed text-secondary">{currentGuide.description}</p>
               </blockquote>}
               {currentGuide?.parsedGuideText ? <div className='pb-8' dangerouslySetInnerHTML={{ __html: currentGuide?.parsedGuideText }}></div> : <Skeleton className="flex-1 flex rounded-full" />}
            </div>
         </div>

         {/** Editor and Preview */}
         <div className="w-3/5 flex-1 flex flex-col border-l-[1px] border-primary pl-2">
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
