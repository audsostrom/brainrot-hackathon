import React, { Dispatch, SetStateAction } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { FileSystemTree } from '@webcontainer/api';
import { Folder } from 'lucide-react';
import { SupportedLanguage } from './code-editor';
import { parseLanguage } from '@/utils/language';

interface DirectoryProps {
  files: FileSystemTree | null;
  currentFile: { file: string; type: SupportedLanguage } | null;
  setCurrentFile: Dispatch<SetStateAction<{ file: string; type: SupportedLanguage } | null>>;
}

export const Directory: React.FC<DirectoryProps> = ({ files, currentFile, setCurrentFile }) => {
  if (!files) {
    return <div className="w-[240px] mt-2 pl-1 text-sm text-gray-400">Loading...</div>;
  }

  return (
    <div className="w-[240px] mt-2 overflow-y-auto pb-10">
      <ul className="pl-1 space-y-2 text-sm">
        {Object.entries(files).map(([key, value]) => (
          <TreeNode
            key={key}
            name={key}
            node={value}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
          />
        ))}
      </ul>
    </div>
  );
};

interface TreeNodeProps {
  name: string;
  node: FileSystemTree[string];
  currentFile: { file: string; type: SupportedLanguage } | null;
  setCurrentFile: Dispatch<SetStateAction<{ file: string; type: SupportedLanguage } | null>>;
  parentPath?: string; // New prop to track the parent path
}

const TreeNode: React.FC<TreeNodeProps> = ({ name, node, currentFile, setCurrentFile, parentPath = '' }) => {
  const fullPath = `${parentPath}${parentPath ? '/' : ''}${name}`; // Construct full path

  if ('directory' in node) {
    return (
      <Collapsible.Root>
        <li>
          <Collapsible.Trigger className="flex items-center gap-1 text-gray-400 hover:underline">
            <Folder className="size-3" /> {name}
          </Collapsible.Trigger>
          <Collapsible.Content className="pl-2">
            <ul className="space-y-2 mt-2">
              {Object.entries(node.directory).map(([childName, childNode]) => (
                <TreeNode
                  key={childName}
                  name={childName}
                  node={childNode}
                  currentFile={currentFile}
                  setCurrentFile={setCurrentFile}
                  parentPath={fullPath} // Pass the updated path
                />
              ))}
            </ul>
          </Collapsible.Content>
        </li>
      </Collapsible.Root>
    );
  }

  if ('file' in node) {
    return (
      <li
        className={`pl-4 text-sm cursor-pointer ${
          currentFile?.file === fullPath ? 'text-blue-500 font-semibold' : 'text-gray-700'
        }`}
        onClick={() => setCurrentFile({ file: fullPath, type: parseLanguage(name.split('.').pop() || 'unknown') })}
      >
        {name} {/* Display only the filename */}
      </li>
    );
  }

  return null;
};
