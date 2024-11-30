import { SupportedLanguage } from "@/components/code-editor/code-editor";

export const parseLanguage = (fileType: string): SupportedLanguage => {
   const languageMap: Record<string, SupportedLanguage> = {
      html: "html",
      css: "css",
      md: "markdown",
      tsx: "javascript",
      jsx: "javascript",
      scss: "css",
      sass: "css",
      js: 'javascript',
      ts: "javascript",
   };

   console.log(fileType.toLowerCase())
   return languageMap[fileType.toLowerCase()] || 'markdown';
};