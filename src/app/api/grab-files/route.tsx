import fs from 'fs/promises';
import path from 'path';
import { getGuideFiles } from "@/app/db";

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
  const listOfFiles: Set<string> = new Set();

  const guideFiles = await getGuideFiles(guideId ?? '');
  const guideFileContents = guideFiles.map((guide) => {
    listOfFiles.add(guide.name);
    return { file: guide.name, content: guide.content };
  });

  const baseFileContents = await Promise.all(
    baseProjectFiles.map(async (filePath) => {
      if (!listOfFiles.has(filePath)) {
        try {
          const fileContent = await fs.readFile(
            path.join(process.cwd(), 'public', 'guides', 'base', filePath),
            'utf8'
          );
          return { file: filePath, content: fileContent };
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
          return null;
        }
      } else {
        return null;
      }
    })
  );

  const fileContents = [
    ...guideFileContents,
    ...baseFileContents.filter((content) => content !== null),
  ];

  return Response.json({ response: fileContents});
}
