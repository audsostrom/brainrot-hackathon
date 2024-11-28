import { getGuide, getGuideFiles } from "@/app/db";

// specifies the base project files
const baseProjectFiles = [
  'app/globals.css',
  'app/layout.tsx',
  'app/page.tsx',
  'next-env.d.ts',
  'next.config.js',
  'package-lock.json',
  'package.json',
  'postcss.config.js',
  'tailwind.config.ts',
  'tsconfig.json',
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const guideId = searchParams.get('id');
  const listOfFiles: Set<string> = new Set(); // no dupes
    const guideFiles = await getGuideFiles(guideId ?? '')
    const guideFileContents = guideFiles.map((guide) => { 
      listOfFiles.add(guide.name)
      return { file: guide.name, content: guide.content} 
    })

   // brainrot-hackathon/public/guides/base/app/favicon.ico
   const baseFileContents = await Promise.all(
      baseProjectFiles.map(async (filePath) => {
        if (!listOfFiles.has(filePath)) {
          const url = `http://localhost:3000/guides/base/${filePath}`;
          const response = await fetch(url);
          const text = await response.text();
          return { file: filePath, content: text };
        }
      })
    ).then(results => results.filter(content => content !== null && content !== undefined));
    
    const fileContents = [...guideFileContents, ...baseFileContents];
    // const fileContents = baseFileContents;

	return Response.json({ response: fileContents});
}
