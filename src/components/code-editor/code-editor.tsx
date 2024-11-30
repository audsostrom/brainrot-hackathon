import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion } from '@codemirror/autocomplete';
import { markdown } from '@codemirror/lang-markdown';
import { Directory } from './directory';
import { FileSystemTree } from '@webcontainer/api';

export type SupportedLanguage = 'javascript' | 'html' | 'css' | 'markdown';

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  files: FileSystemTree | null;
  currentFile: { file: string; type: SupportedLanguage;} | null;
  setCurrentFile: Dispatch<SetStateAction<{ file: string; type: SupportedLanguage;} | null>>
  language: SupportedLanguage; // relevant docs https://codemirror.net/examples/lang-package/
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ value, onChange, files, language, currentFile, setCurrentFile}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  // Initialize the editor once
  useEffect(() => {
    if (!editorRef.current || editorViewRef.current) return;

    const languageExtension = {
      javascript: javascript(),
      html: html(),
      css: css(),
      markdown: markdown()
    }[language];

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const doc = update.state.doc.toString();
        onChange(doc);
      }
    });

    const editorState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        languageExtension,
        oneDark,
        autocompletion(),
        updateListener,
      ],
    });

    editorViewRef.current = new EditorView({
      state: editorState,
      parent: editorRef.current,
    });

    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
    };
  }, [language, onChange]);

  // Sync the value without resetting the editor
  useEffect(() => {
    if (editorViewRef.current) {
      const currentDoc = editorViewRef.current.state.doc.toString();
      if (currentDoc !== value) {
        const transaction = editorViewRef.current.state.update({
          changes: { from: 0, to: currentDoc.length, insert: value },
        });
        editorViewRef.current.dispatch(transaction);
      }
    }
  }, [value]);

  return (
    <div className='border border-secondary flex flex-row flex flex-1 h-[300px]'>
      <Directory files={files} setCurrentFile={setCurrentFile} currentFile={currentFile}/>
      <div ref={editorRef} className={`bg-[#282c34] overflow-y-scroll w-full h-full`} />
    </div>);
};

export default CodeMirrorEditor;
