'use client';
import { useEffect, useState } from 'react';

export default function Guide() {
  const [files, setFiles] = useState<{file: string, content: string}[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/grab-files');
        const data = await response.json();
        setFiles(data.response);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div>
      <h1>Files in the Project</h1>
      <ul>
        {files.map((fileData, index) => (
          <li key={index}>
            <h3>{fileData.file}</h3>
            <pre>{fileData.content}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
