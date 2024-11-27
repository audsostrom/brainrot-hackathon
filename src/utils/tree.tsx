import { DirectoryNode, FileSystemTree } from '@webcontainer/api';

/** Interface used by Mat Trees in learn container */
export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

/** Converts an array of files to the format webcontainer api needs. */
export function convertFilesToTree(files: Array<{ file: string, content: string }>): FileSystemTree {
  const tree = {};

  for (const file of files) {
    const segments = file['file'].split('/');
    let subtree: FileSystemTree = tree;

    for (let i = 0; i < segments.length; i++) {
      if (i < segments.length - 1) {
        // for the directories, create it if it doesn't already exist
        if (!(segments[i] in subtree)) {
          subtree[segments[i]] = {
            directory: {},
          } as DirectoryNode;
        }
         subtree = (subtree[segments[i]] as DirectoryNode).directory;
      } else {
        subtree[segments[i]] = {
          file: {
            contents: file.content,
          },
        };
      }
    }
  }
  return tree;
}