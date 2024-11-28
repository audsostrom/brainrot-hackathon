import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion } from '@codemirror/autocomplete';

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'javascript' | 'html' | 'css';
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ value, onChange, language }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  // Initialize the editor once
  useEffect(() => {
    if (!editorRef.current || editorViewRef.current) return;

    const languageExtension = {
      javascript: javascript(),
      html: html(),
      css: css(),
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

  return <div ref={editorRef} className="bg-[#282c34] h-[300px] overflow-y-scroll" />;
};

export default CodeMirrorEditor;
